import { Card } from '../components/card.js'; 
import {Section} from '../components/section.js';
import { initialCards} from '../utils/initial-cards.js';
import { photoGrid, profileEditButton, newCardAddButton } from '../utils/constants.js';
import PopupWithForm from '../components/popup-with-form.js';
import PopupWithImage from '../components/popup-with-image.js';
//import { popupPlace, popupPlaceForm, popupPlaceHeadingInput, popupPlaceImageLinkInput, closePopup } from '../components/popup.js';
//import { FormValidator, validationConfig } from '../components/FormValidator.js';

//import UserInfo from '../components/user-info.js';

//В файле index.js должно остаться только создание классов и добавление некоторых обработчиков.

// export const popupEditFormValidation = new FormValidator(validationConfig, popupEditForm) 
// popupEditFormValidation.enableValidation()

// export const popupPlaceFormValidation = new FormValidator(validationConfig, popupPlaceForm) 
// popupPlaceFormValidation.enableValidation()



//new place
// const popupPlace = document.querySelector('.popup_type_new-place')
// const popupPlaceForm = popupPlace.querySelector('.popup__form')
// const popupPlaceHeadingInput = popupPlace.querySelector('.popup__input_value_heading')
// const popupPlaceImageLinkInput = popupPlace.querySelector('.popup__input_value_image')



// const userInfo = new UserInfo({name: '.profile__title', job: '.profile__subtitle'})

//функция редактирования информации в профиле
// function handleProfileEditFormSubmit (evt) {
//   evt.preventDefault()
//   // userInfo.setUserInfo()
  
//   // popupEditFormValidation.resetForm()
//   closePopup(popupEdit)
// }

//функция добавления карточки через форму
// function submitCardsForm (evt) {
//   evt.preventDefault()
  
//   photoGrid.prepend(createCard({ name: popupPlaceHeadingInput.value, link: popupPlaceImageLinkInput.value }))
//   // popupPlaceFormValidation.resetForm()
//   closePopup(popupPlace)
// }

// const popupWithImage = new PopupWithImage('.popup_type_image')
// popupWithImage.setEventListeners()

const popupImage = new PopupWithImage('.popup_type_image')
function cardImageClickHandler(link, name) {
  popupImage.open(link, name)
};

const initialCardsList = new Section ({ 
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, cardImageClickHandler)
    
    
    return cardElement.render()
  }}, 
  photoGrid
);

initialCardsList.renderItems();

const profileEditForm = new PopupWithForm('.popup_type_edit', /*handleProfileEditFormSubmit*/)
const newPlaceForm = new PopupWithForm('.popup_type_new-place', /*submitCardsForm*/)

profileEditButton.addEventListener('click', () => profileEditForm.openPopup());
newCardAddButton.addEventListener('click', () => newPlaceForm.openPopup());



//popupPlaceForm.addEventListener('submit', submitCardsForm)