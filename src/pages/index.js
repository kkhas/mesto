import './index.css'
import { Card } from '../scripts/components/card.js'; 
import { Section } from '../scripts/components/section.js';
import { photoGrid, 
  profileEditButton, 
  newCardAddButton,
  popupEditNameInput, 
  popupEditJobInput, 
  avatarElement,
  avatarEditElement,
  popupEdit,
  popupAvatarElement,
  profileName, 
  profileAbout,
  popupConfirm,
  popupNewPlace,
  popupImageSelector,
  popupProfileEditForm,
  avatarEditForm,
  popupNewPlaceForm,
  profileBtnValue,
  profileBtnNewValue,
  newPlaceBtnValue,
  newPlaceBtnNewValue,
  itemTemplate } from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/popup-with-form.js';
import PopupWithImage from '../scripts/components/popup-with-image.js';
import { FormValidator } from '../scripts/components/form-validator.js';
import UserInfo from '../scripts/components/user-info.js';
import validationConfig from '../scripts/utils/validation-config.js';
import Api from '../scripts/components/api.js';
import PopupWithConfirmation from '../scripts/components/popup-with-confirmation.js';
import { renderLoading } from '../scripts/utils/utils.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '197e4656-d963-4ef2-94ca-2fcf60ccdd88',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(profileName, profileAbout, avatarElement)
const newCard = new Section (renderer, photoGrid);
const confirmPopup = new PopupWithConfirmation (popupConfirm, handleConfirmDeleting)
const profileEditForm = new PopupWithForm(popupEdit, handleProfileEditFormSubmit)
const newPlaceForm = new PopupWithForm(popupNewPlace, submitCardsForm)
const editAvatarForm = new PopupWithForm(popupAvatarElement, handleEditAvatarFormSubmit)
const popupImage = new PopupWithImage(popupImageSelector)

const popupPlaceFormValidation = new FormValidator(validationConfig, popupNewPlaceForm)
popupPlaceFormValidation.enableValidation()

const popupEditFormValidation = new FormValidator(validationConfig, popupProfileEditForm) 
popupEditFormValidation.enableValidation()

const popupAvatarFormValidation = new FormValidator(validationConfig, avatarEditForm,)
popupAvatarFormValidation.enableValidation()

let user = null;
let owner;
let _id

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([userInfo, cards]) => {
  recordUserInfo(userInfo);
  renderInitialCards(cards)
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

function recordUserInfo(result) {
  userInfo.setUserInfo(result);
  avatarElement.src = result.avatar;
  user= result;
  owner = result;
}

function renderInitialCards(result) {
  newCard.renderItems(result);
}

function renderer(cardData) {
  const cardElement = new Card(
    itemTemplate,
    cardData, 
    user,
    cardImageClickHandler, 
    handleDeleteClick,
    handleLikeAdd,
    handleLikeDelete)

  return cardElement.render()
}

function handleLikeAdd(evt, cardData) {
  api.like(cardData._id)
  .then((res) => {
    evt.target.nextElementSibling.textContent = res.likes.length
    evt.target.classList.add('photo-grid__like-active')
  })
  .catch((err) => {console.log(err)})
}

function handleLikeDelete(evt, cardData) {
  api.deleteLike(cardData._id)
  .then((res) => {
    evt.target.nextElementSibling.textContent = res.likes.length
    evt.target.classList.remove('photo-grid__like-active')
  })
  .catch((err) => {console.log(err)})
}

function cardImageClickHandler(link, name) {
  popupImage.open(link, name)
};

function handleDeleteClick(evt, cardData) {
  confirmPopup.open()
  confirmPopup.setEventListeners(evt, cardData)
}

function handleConfirmDeleting(evt, cardData) {
  evt.target.parentNode.remove();
  api.deleteCard(cardData)
  .catch((err) => {console.log(err)})
}

//функция добавления карточки через форму
function submitCardsForm (data) {
  renderLoading(true, popupNewPlace, newPlaceBtnValue, newPlaceBtnNewValue)
  api.postCard(data).then((data) => {
    
    _id = data._id
    data.owner = owner
    data.likes = []
    newCard.addItem(renderer(data))
    newPlaceForm.close()
  })
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, popupNewPlace, newPlaceBtnValue, newPlaceBtnNewValue)
    
  })
}

//функция редактирования информации в профиле
function handleProfileEditFormSubmit (data) {
  renderLoading(true, popupEdit, profileBtnValue, profileBtnNewValue)
  api.updateUserInfo(data)
  .then((dataUpdated => {
    recordUserInfo(dataUpdated)
    profileEditForm.close()
  }))
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, popupEdit, profileBtnValue, profileBtnNewValue)
    
  })
}

function pasteUserData(data) {
  popupEditNameInput.value = data.name 
  popupEditJobInput.value = data.job
}

profileEditButton.addEventListener('click', () => {
  popupEditFormValidation.resetForm()
  pasteUserData(userInfo.getUserInfo())
  profileEditForm.open()
});

newCardAddButton.addEventListener('click', () => {
  newPlaceForm.open()
  popupPlaceFormValidation.resetForm()
});

avatarEditElement.addEventListener('click', () => {
  editAvatarForm.open()
  popupAvatarFormValidation.resetForm()
})

//функция обновления аватара через форму
function handleEditAvatarFormSubmit(data) {
  renderLoading(true, popupAvatarElement, profileBtnValue, profileBtnNewValue)
  api.editAvatar(data)
  .then(res => {
    avatarElement.src = res.avatar;
    editAvatarForm.close()})
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, popupAvatarElement, profileBtnValue, profileBtnNewValue)
    
  })
}