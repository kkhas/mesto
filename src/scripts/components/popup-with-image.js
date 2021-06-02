import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector)
      this._picturePopupImage = this._popup.querySelector('.popup__image');
      this._textPopupImage = this._popup.querySelector('.popup__image-title');
    }

    open(link, name) {
      this._picturePopupImage.src = link;
      this._picturePopupImage.alt = name;
      this._textPopupImage.textContent = name;   
      super.open();
    }
  }