import Popup from './popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
      super(popupSelector);
      this._formSubmitHandler = formSubmitHandler;
      this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    }
 
    _getInputValues() {
      const values = {}
      
      this._inputs.forEach(input => {
        values[input.name] = input.value;
      })
      
      return values;
    }

    setEventListeners() {
      super.setEventListeners();

      this._form = this._popup.querySelector('.popup__form');

      this._form.addEventListener('submit', (e) => {
        e.preventDefault();

        this._formSubmitHandler(this._getInputValues());

        this.closePopup();
      });
    }

    closePopup() {
      this._form.reset()
      super.closePopup()
    }
  }