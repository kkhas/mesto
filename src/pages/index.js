import './index.css'
import { Card } from '../scripts/components/card.js'; 
import { Section } from '../scripts/components/section.js';
import { initialCards} from '../scripts/utils/initial-cards.js';
import { photoGrid, 
  profileEditButton, 
  newCardAddButton } from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/popup-with-form.js';
import PopupWithImage from '../scripts/components/popup-with-image.js';
import { FormValidator } from '../scripts/components/form-validator.js';
import UserInfo from '../scripts/components/user-info.js';
import validationConfig from '../scripts/utils/validation-config.js'

const popupImage = new PopupWithImage('.popup_type_image')

function cardImageClickHandler(link, name) {
  popupImage.openPopup(link, name)
};

function renderer(item) {
  const cardElement = new Card(item, cardImageClickHandler)
  return cardElement.render()
}

//добавление карточек из массива
const newCard = new Section ({ 
  items: initialCards,
  renderer},
  photoGrid
);

newCard.renderItems();

//функция добавления карточки через форму
function submitCardsForm (data) {
  newCard.addItem(renderer(data))
}

const newPlaceForm = new PopupWithForm('.popup_type_new-place', submitCardsForm)

const userInfo = new UserInfo()

//функция редактирования информации в профиле
function handleProfileEditFormSubmit (data) {
  userInfo.setUserInfo(data)
}

const profileEditForm = new PopupWithForm('.popup_type_edit', handleProfileEditFormSubmit)


const popupPlaceFormValidation = new FormValidator(validationConfig, document.querySelector('.popup__form_new-place'))
popupPlaceFormValidation.enableValidation()

const popupEditFormValidation = new FormValidator(validationConfig, document.querySelector('.popup__form_edit')) 
popupEditFormValidation.enableValidation()

function pasteUserData(data) {
  const popupEditNameInput = document.querySelector('.popup__input_value_name')
  const popupEditJobInput = document.querySelector('.popup__input_value_title')
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