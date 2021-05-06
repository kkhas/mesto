import { validationConfig } from './validate.js';

// //pop-ups
const popupEdit = document.querySelector('.popup_type_edit')
const popupPlace = document.querySelector('.popup_type_new-place')
const popupImage = document.querySelector('.popup_type_image')

// //profile edit
const popupEditButton = document.querySelector('.profile__edit-button')
const popupEditForm = popupEdit.querySelector('.popup__form')
const popupEditClose = popupEdit.querySelector('.popup__close')
const popupEditNameInput = popupEdit.querySelector('.popup__input_value_name')
const popupEditJobInput = popupEdit.querySelector('.popup__input_value_title')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

// //new place
const popupPlaceOpen = document.querySelector('.profile__add')
const popupPlaceClose = popupPlace.querySelector('.popup__close')
const popupPlaceForm = popupPlace.querySelector('.popup__form')
const popupPlaceHeadingInput = popupPlace.querySelector('.popup__input_value_heading')
const popupPlaceImageLinkInput = popupPlace.querySelector('.popup__input_value_image')
const createButton = popupPlace.querySelector('.popup__save-button')

// //image pop-up
const popupImageClose = popupImage.querySelector('.popup__close')
const picturePopupImage = popupImage.querySelector('.popup__image')
const textPopupImage = popupImage.querySelector('.popup__image-title')

// подстановка значений в PopupEdit
function inputPopupEditValue (popup) {
  popupEditNameInput.value = profileTitle.textContent
  popupEditJobInput.value = profileSubtitle.textContent
}

// закрытие попапа кнопкой Esc
function handleClosePopup(e) {
  if (e.key === "Escape") {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_active')
  document.addEventListener('keyup', handleClosePopup);
}

//закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_active')
  document.removeEventListener('keyup', handleClosePopup);
}

popupEditButton.addEventListener('click', function () { 
  //cleanForm(popupEditForm)
  inputPopupEditValue (popupEdit)
  openPopup(popupEdit)
})

popupPlaceOpen.addEventListener('click', function () { 
  popupPlaceForm.reset()
  const button = popupPlace.querySelector(validationConfig.submitButtonSelector)
  //button.disabled = true;
  //button.classList.add(validationConfig.inactiveButtonClass)

  
  //cleanForm(popupPlaceForm)
  openPopup(popupPlace)
})


popupEditClose.addEventListener('click', () => closePopup(popupEdit))
popupPlaceClose.addEventListener('click', () => closePopup(popupPlace))

popupEdit.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
      closePopup(popupEdit)
  }
})

popupPlace.addEventListener ('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupPlace)
}
})

popupImage.addEventListener ('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupImage)
}
})

//функция редактирования информации в профиле
function handleProfileEditFormSubmit (evt) {
  evt.preventDefault()
  profileTitle.textContent = popupEditNameInput.value
  profileSubtitle.textContent = popupEditJobInput.value
  closePopup(popupEdit)
}

popupEditForm.addEventListener('submit', handleProfileEditFormSubmit);


export { popupPlace, popupPlaceForm, openPopup, popupImage, closePopup, popupPlaceHeadingInput, popupPlaceImageLinkInput }