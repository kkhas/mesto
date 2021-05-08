const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
  }
  
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
     })
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass)
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass)
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        
        this._toggleButtonState();
      });
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._setEventListeners(this._formElement);
  }

  resetForm() {
    this._formElement.reset()
    this._toggleButtonState()

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
      });
  }  
}

export { validationConfig, FormValidator }; 