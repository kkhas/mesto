import Popup from './popup.js';

export default class PopupWithForm extends Popup {
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    constructor(popupSelector, /*formSubmitHandler*/) {
      super(popupSelector);
      //this._formSubmitHandler = formSubmitHandler;
    }
 
    // _getInputValues() {
    //   const values = {}
    //   const inputs = Array.from(this._form.querrySelectorAll('.popup__input'))
    //   inputs.forEach(input => {
    //     values[input.name] = input.value
    //   })
    //   return values;
    // }

    //Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    // setEventListeners() {
    //   super(this.setEventListeners);

    //   this._form = this._popup.querySelector('.popup__form')
    //   // this._form.addEventListener('submit', () => {
    //   //   this._formSubmitHandler(this._getInputValues())
    //   // });
    // }

    // close() {
    //   this._form.reset()
    //   super.close()
    // }
  }