import { popupEditForm } from './popup.js';


function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
  
  function toggleButtonState (inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass)
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass)
      buttonElement.disabled = false;
    }
  }

  const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };
  
  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);

        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };
  
  function enableValidation (validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
    });
  }

  

enableValidation(validationConfig ) 

// new branch

// const validationConfig = {
//   form: '.popup__form[name="edit"]',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }

// class FormValidator {
//   constructor(validationConfig) {
//     this._validationConfig = validationConfig;
//   }

//   enableValidation () {
//     const formElement = document.querySelector(this._validationConfig.form)
//     formElement.addEventListener('submit', this._handleFormInput);
//     formElement.addEventListener('submit', this._handleFormSubmit);
//   }

//   _handleFormSubmit = (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     const isValid = form.checkValidity();
//     if (isValid) {
//       form.reset();
//     } else {
//       console.log('Form is not valid');
//     }
//   }

//   _handleFormInput = (event) => {
//     const input = event.target;
//     const form = event.currentTarget;

//     //this._setCustomError(input);

//     this._setFieldError(input);

//     this._setSubmitButtonState(form, this._validationConfig)
//   }

//   // _checkInputValidity() {
//   //   if (!inputElement.validity.valid) {
//   //     this._showInputError(formElement, inputElement, inputElement.validationMessage);
//   //   } else {
//   //     this._hideInputError(formElement, inputElement);
//   //   }
//   //};

//   _setFieldError(field) {
//     const span = field.nextElementSibling;

//     span.textContent = field.validationMessage;
//   }

//   _setSubmitButtonState(form) {
//     // Найдём кнопку в форме.
//     const button = form.querySelector(this._validationConfig.submitButtonSelector);
//     // Проверим, валидна ли форма?
//     const isValid = form.checkValidity(); // Форма валидна в целом или нет?

//     if (isValid) {
//         // Если форма валидна, атрибут `disabled` и классы ошибок с кнопки нужно снять.
//         button.removeAttribute('disabled');
//         button.classList.add(this._validationConfig.inactiveButtonClass);
//     } else {
//         // Если форма НЕ валидно, атрибут `disabled` и классы ошибок на кнопке нужно установить.
//         button.setAttribute('disabled', true);
//         button.classList.remove(this._validationConfig.inactiveButtonClass);
//     }
// }

//   _setCustomError(input) {
//     const validity = input.validity;

//     input.setCustomValidity('');

//     if (validity.tooShort || validity.tooLong) {
//         const current = input.value.length;
//         const min = input.getAttribute('minlength');
//         const max = input.getAttribute('maxlength')
//         input.setCustomValidity(`Строка слишком короткая. Введено ${current} символов, а должно быть от ${min} до ${max}`);
//     }
//   }

//   // _showInputError(formElement, inputElement, errorMessage) {
//   //   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   //   inputElement.classList.add(this._validationConfig.inputErrorClass);
//   //   errorElement.textContent = errorMessage;
//   //   errorElement.classList.add(this._validationConfig.errorClass);
//   // };

//   // _hideInputError(formElement, inputElement) {
//   //   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   //   inputElement.classList.remove(this._validationConfig.inputErrorClass);
//   //   errorElement.classList.remove(this._validationConfig.errorClass);
//   //   errorElement.textContent = '';
//   // };

//   // _setEventListeners = (event) => {
//   //   const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    
//   //   //this._toggleButtonState(inputList, buttonElement);
    
//   //   const inputElement = event.target
//   //   inputElement.addEventListener('input', () => this._checkInputValidity()
//   //   //     this._toggleButtonState(inputList, buttonElement);
//   //   );
//   // };



//   // _toggleButtonState(inputList, buttonElement) {
//   //   if (this._hasInvalidInput(inputList)) {
//   //     buttonElement.classList.add(this._validationConfig.inactiveButtonClass)
//   //     buttonElement.disabled = true;
//   //   } else {
//   //     buttonElement.classList.remove(this._validationConfig.inactiveButtonClass)
//   //     buttonElement.disabled = false;
//   //   }
//   // }

//   // _hasInvalidInput(inputList) {
//   //   return inputList.some((inputElement) => {
//   //     return !inputElement.validity.valid;
//   //   })
//   // }

  


    

    

    
//   // _cleanForm(formElement) {
//   //   inputElement.classList.remove(this._validationConfig.inputErrorClass);
//   //   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
          
//   //   errorElement.textContent = '';
//   // }
    

// }

// const popupEditFormValidation = new FormValidator(validationConfig) 
// popupEditFormValidation.enableValidation()

export { validationConfig }