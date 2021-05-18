import Popup from './popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
      super(popupSelector);
      this._formSubmitHandler = formSubmitHandler;
    }
 
    _getInputValues() {
      const values = {}
      const inputs = Array.from(this._form.querySelectorAll('.popup__input'))
      inputs.forEach(input => {
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

    pasteUserData(data) {
      const popupEditNameInput = document.querySelector('.popup__input_value_name')
      const popupEditJobInput = document.querySelector('.popup__input_value_title')
      popupEditNameInput.value = data.name 
      popupEditJobInput.value = data.job
    }

    closePopup() {
      this._form.reset()
      super.closePopup()
    }
  }