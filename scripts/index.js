import { Card } from './card.js'; 
import { popupPlaceForm, closePopup, popupPlace, popupPlaceHeadingInput, popupPlaceImageLinkInput } from './popup.js';

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
  closePopup(popupPlace)
}

popupPlaceForm.addEventListener('submit', submitCardsForm)
