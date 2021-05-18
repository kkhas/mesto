import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector)
    }

    openPopup(link, name) {
      const picturePopupImage = this._popup.querySelector('.popup__image');
      const textPopupImage = this._popup.querySelector('.popup__image-title');
      
      picturePopupImage.src = link;
      picturePopupImage.alt = name;
      textPopupImage.textContent = name;   
      super.openPopup();
    }
  }