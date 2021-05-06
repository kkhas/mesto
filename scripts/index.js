import { Card } from './card.js'; 
import { popupPlace, popupPlaceForm, popupPlaceHeadingInput, popupPlaceImageLinkInput, closePopup } from './popup.js';





const itemTemplate = document.querySelector(".item_template").content;
const photoGrid = document.querySelector(".photo-grid");




// очистка формы от ошибок
function cleanForm (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        
    errorElement.textContent = '';
  })
}

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
