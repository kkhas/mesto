import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector)
    }

    open(link, name) {
      super.open();
      const picturePopupImage = this._popup.querySelector('.photo-grid__image');
      const textPopupImage = this._popup.querySelector('.photo-grid__title');

      console.log(this._popup);
      
      picturePopupImage.src = link;
      picturePopupImage.alt = name;
      textPopupImage.textContent = name;

      
    }
  }