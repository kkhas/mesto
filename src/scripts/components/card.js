export class Card {

  constructor(cardData, user, handleCardClick, handleDeleteButtonClick, handleLikeAdd, handleLikeDelete) {
    this._cardData = cardData;
    this._cardData.name = cardData.name;
    this._cardData.link = cardData.link;
    this._cardData.likes = cardData.likes;
    this._cardData._id = cardData._id;
    this._currentUser = user;
    this._cardElement = this._createCardElement();
    
    this._addEventListeners();
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDelete = handleLikeDelete;
    // console.log(this._currentUser)
    // Array.from(this._cardData.likes).forEach(element => console.log(element));
  }

  getId() {
    return this._cardData._id
  }

  _createCardElement() {
    this._owner = this._cardData.owner._id;
    const cardElement = document.querySelector(".item_template").content.children[0].cloneNode(true);
    const image = cardElement.querySelector('.photo-grid__image');
    const title = cardElement.querySelector('.photo-grid__title');
    const likes = cardElement.querySelector('.photo-grid__like-count');
    const deleteButton = cardElement.querySelector('.photo-grid__delete')
    this._likeElement = cardElement.querySelector('.photo-grid__like');

    image.src = this._cardData.link;
    image.alt = this._cardData.name;
    title.textContent = this._cardData.name;
    likes.textContent = this._cardData.likes.length;

    if(this._cardData.likes.some(like => like._id === this._currentUser._id)) {
      this._likeElement.classList.add('photo-grid__like-active')
    }

    if (this._owner === this._currentUser._id) {
      deleteButton.classList.remove('photo-grid__delete_hidden')
    }
    
    return cardElement;
  }
  
  _isLiked() {
    
  }

  _addEventListeners() {
    this._likeElement.addEventListener('click', (evt) => {
      if(this._cardData.likes.some(like => like._id === this._currentUser._id)){
        this._handleLikeDelete(evt, this._cardData)
      } else {
        this._handleLikeAdd(evt, this._cardData)
      }
  });
    
    const deleteButton = this._cardElement.querySelector('.photo-grid__delete');
    deleteButton.addEventListener('click', (evt) => {this._handleDeleteButtonClick(evt, this._cardData._id)});

    this._cardElement.querySelector('.photo-grid__image').addEventListener('click', () => this._handleCardClick(this._cardData.link, this._cardData.name))
  }

  like() {
    this._likeElement.classList.toggle('photo-grid__like-active')
  }

  remove() {
    this._cardElement.remove()
  }

  render() {

    return this._cardElement;
  }
}