//import { popupPlaceFormValidation, popupEditFormValidation } from '../pages/index.js'

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.setEventListeners();
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.closePopup();
    }
  }

  //слушатель событий
  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.closePopup());

    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
          this.closePopup()
      }
    })
  }
  
  //открытие попапов
  openPopup() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keyup', this._handleEscClose);
  }

  //закрытие попапов
  closePopup() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keyup', this._handleEscClose);
  }
}

export default Popup





// // подстановка значений в PopupEdit class UserInfo
// function inputPopupEditValue (popup) {
//   popupEditNameInput.value = profileTitle.textContent
//   popupEditJobInput.value = profileSubtitle.textContent
// }




// popupEditButton.addEventListener('click', function () { 
//   inputPopupEditValue (popupEdit)
//   popupEditFormValidation.resetForm()
//   openPopup(popupEdit)
// })

// popupEditForm.addEventListener('submit', handleProfileEditFormSubmit);