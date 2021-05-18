export class Card {

  constructor(cardData, handleCardClick) {
    this._cardData = cardData;
    this._cardData.name = cardData.name;
    this._cardData.link = cardData.link;
    this._cardElement = this._createCardElement();
    this._likeElement = this._cardElement.querySelector('.photo-grid__like');
    this._addEventListeners();
    this._handleCardClick = handleCardClick;
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

    this._cardElement.querySelector('.photo-grid__image').addEventListener('click', () => this._handleCardClick(this._cardData.link, this._cardData.name))
  }

  _like() {
    this._likeElement.classList.toggle('photo-grid__like-active')
  }

  _remove() {
    this._cardElement.remove();
  }

  render() {
    return this._cardElement;
  }
}