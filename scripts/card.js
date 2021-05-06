import { popupImage, openPopup } from './popup.js'

export class Card {

  constructor(cardData) {
    this._cardData = cardData;
    this._cardElement = this._createCardElement();
    this._likeElement = this._cardElement.querySelector('.photo-grid__like');
    this._addEventListeners();
  }

  _createCardElement() {
    const cardElement = document.querySelector(".item_template").content.children[0].cloneNode(true);
    const image = cardElement.querySelector('.photo-grid__image');
    const title = cardElement.querySelector('.photo-grid__title');

    image.src = this._cardData.link;
    image.alt = this._cardData.name;
    title.textContent = this._cardData.name;

    return cardElement;
  }

  _addEventListeners() {
    this._likeElement.addEventListener('click', () => this._like());
    
    const deleteButton = this._cardElement.querySelector('.photo-grid__delete');
    deleteButton.addEventListener('click', () => this._remove());

    this._cardElement.querySelector('.photo-grid__image').addEventListener('click', () => this._preview())
  }

  _like() {
    this._likeElement.classList.toggle('photo-grid__like-active')
  }

  _remove() {
    this._cardElement.remove();
  }

  _preview() {
    const picturePopupImage = popupImage.querySelector('.popup__image')
    const textPopupImage = popupImage.querySelector('.popup__image-title')

    picturePopupImage.src = this._cardData.link;
    picturePopupImage.alt = this._cardData.name;
    textPopupImage.textContent = this._cardData.name;

    openPopup(popupImage)
  }

  render() {
    return this._cardElement;
  }
}