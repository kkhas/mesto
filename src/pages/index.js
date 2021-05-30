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
  popupConfirm,
  popupEdit,
  popupAvatarElement } from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/popup-with-form.js';
import PopupWithImage from '../scripts/components/popup-with-image.js';
import { FormValidator } from '../scripts/components/form-validator.js';
import UserInfo from '../scripts/components/user-info.js';
import validationConfig from '../scripts/utils/validation-config.js';
import Api from '../scripts/components/api.js';
import PopupWithConfirmation from '../scripts/components/popup-with-confirmation.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '197e4656-d963-4ef2-94ca-2fcf60ccdd88',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo('.profile__title', '.profile__subtitle')
const newCard = new Section (renderer, photoGrid);
const confirmPopup = new PopupWithConfirmation ('.popup_type_confirm', handleConfirmDeleting)
const profileEditForm = new PopupWithForm('.popup_type_edit', handleProfileEditFormSubmit)
const newPlaceForm = new PopupWithForm('.popup_type_new-place', submitCardsForm)
const editAvatarForm = new PopupWithForm('.popup_type_edit-avatar', handleEditAvatarFormSubmit)
const popupImage = new PopupWithImage('.popup_type_image')

const popupPlaceFormValidation = new FormValidator(validationConfig, document.querySelector('.popup__form_new-place'))
popupPlaceFormValidation.enableValidation()

const popupEditFormValidation = new FormValidator(validationConfig, document.querySelector('.popup__form_edit')) 
popupEditFormValidation.enableValidation()

const popupAvatarFormValidation = new FormValidator(validationConfig, document.querySelector('.popup__form_edit-avatar'))
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

function renderer(item) {
  const cardElement = new Card(item, 
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
  .finally()
}

function handleLikeDelete(evt, cardData) {
  api.deleteLike(cardData._id)
  .then((res) => {
    evt.target.nextElementSibling.textContent = res.likes.length
    evt.target.classList.remove('photo-grid__like-active')
  })
  .catch((err) => {console.log(err)})
  .finally()
}

function cardImageClickHandler(link, name) {
  popupImage.openPopup(link, name)
};

function handleDeleteClick(evt, cardData) {
  confirmPopup.openPopup()
  confirmPopup.setEventListeners(evt, cardData)
}

function handleConfirmDeleting(evt, cardData) {
  evt.target.parentNode.remove();
  api.deleteCard(cardData)
  .catch((err) => {console.log(err)})
  .finally()
}

//функция добавления карточки через форму
function submitCardsForm (data) {
  api.postCard(data).then((data) => {
    
    _id = data._id
    data.owner = owner
    data.likes = []
    newCard.addItem(renderer(data))
    newPlaceForm.closePopup()
  })
  .catch((err) => {console.log(err)})
  .finally()
}

//функция редактирования информации в профиле
function handleProfileEditFormSubmit (data) {
  renderLoading(true, popupEdit)
  api.updateUserInfo(data)
  .then((dataUpdated => {
    recordUserInfo(dataUpdated)
  }))
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, popupEdit)
    profileEditForm.closePopup()
  })
}






function pasteUserData(data) {
  popupEditNameInput.value = data.name 
  popupEditJobInput.value = data.job
}

profileEditButton.addEventListener('click', () => {
  popupEditFormValidation.resetForm()
  pasteUserData(userInfo.getUserInfo())
  profileEditForm.openPopup()
});

newCardAddButton.addEventListener('click', () => {
  newPlaceForm.openPopup()
  popupPlaceFormValidation.resetForm()
});



avatarEditElement.addEventListener('click', () => {
  editAvatarForm.openPopup()
  popupAvatarFormValidation.resetForm()
})

//функция обновления аватара через форму
function handleEditAvatarFormSubmit(data) {
  renderLoading(true, popupAvatarElement)
  api.editAvatar(data)
  .then(res => avatarElement.src = res.avatar)
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, popupAvatarElement)
    editAvatarForm.closePopup()
  })
}

function renderLoading(isLoading, popupSelector) {
  
  if(isLoading) {
    popupSelector.querySelector('.popup__save-button').value = "Сохранение..."
  } else {
    popupSelector.querySelector('.popup__save-button').value = "Сохранить"
  }
}