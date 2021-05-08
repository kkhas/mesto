import { Card } from './card.js'; 
import { popupEditForm, popupPlace, popupPlaceForm, popupPlaceHeadingInput, popupPlaceImageLinkInput, closePopup } from './popup.js';
import { FormValidator, validationConfig } from './FormValidator.js';

export const popupEditFormValidation = new FormValidator(validationConfig, popupEditForm) 
popupEditFormValidation.enableValidation()

export const popupPlaceFormValidation = new FormValidator(validationConfig, popupPlaceForm) 
popupPlaceFormValidation.enableValidation()


const photoGrid = document.querySelector(".photo-grid");


//функция создания карточки
function createCard(item) {
  const cardElement = new Card(item)
  return cardElement.render()
}

//размещение карточек из массива
initialCards.forEach(item => {
  photoGrid.append(createCard(item))
})

//функция добавления карточки через форму
function submitCardsForm (evt) {
  evt.preventDefault()
  
  photoGrid.prepend(createCard({ name: popupPlaceHeadingInput.value, link: popupPlaceImageLinkInput.value }))
  popupPlaceFormValidation.resetForm()
  closePopup(popupPlace)
}

popupPlaceForm.addEventListener('submit', submitCardsForm)