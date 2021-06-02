import Popup from './popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, confirmSubmitHandler) {
      super(popupSelector);
      this._confirmSubmitHandler = confirmSubmitHandler.bind(this);
    }

    setEventListeners(evt, data) {
      super.setEventListeners();
      this._form = this._popup.querySelector('.popup__form');
       
        this._data = data;
        this._evt = evt;
    
       this._form.addEventListener('submit', (e) => { 
        e.preventDefault()  
        
        this._confirmSubmitHandler(this._evt, this._data);
        this.close();
      })
    }
  }