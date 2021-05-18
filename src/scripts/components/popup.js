export default class Popup {
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