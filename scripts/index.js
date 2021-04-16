// //pop-ups
const popupEdit = document.querySelector('.popup_type_edit')
const popupPlace = document.querySelector('.popup_type_new-place')
const popupImage = document.querySelector('.popup_type_image')

// //profile edit
const popupEditButton = document.querySelector('.profile__edit-button')
const popupEditForm = popupEdit.querySelector('.popup__form')
const popupEditClose = popupEdit.querySelector('.popup__close')
const popupEditNameInput = popupEdit.querySelector('.popup__input_value_name')
const popupEditJobInput = popupEdit.querySelector('.popup__input_value_title')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

// //new place
const popupPlaceOpen = document.querySelector('.profile__add')
const popupPlaceClose = popupPlace.querySelector('.popup__close')
const popupPlaceForm = popupPlace.querySelector('.popup__form')
const popupPlaceHeadingInput = popupPlace.querySelector('.popup__input_value_heading')
const popupPlaceImageLinkInput = popupPlace.querySelector('.popup__input_value_image')

// //image pop-up
const popupImageClose = popupImage.querySelector('.popup__close')
const picturePopupImage = popupImage.querySelector('.popup__image')
const textPopupImage = popupImage.querySelector('.popup__image-title')

// //initial cards array
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const itemTemplate = document.querySelector(".item_template").content;
const photoGrid = document.querySelector(".photo-grid");


// подстановка значений в PopupEdit
function inputPopupEditValue (popup) {
  popupEditNameInput.value = profileTitle.textContent
  popupEditJobInput.value = profileSubtitle.textContent
}

// очистка формы от ошибок
function cleanForm (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))

  inputList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        
    errorElement.textContent = '';
  })
}

//очистка формы от текста введенного ранее
function prepareForm (popup) {
  popupPlaceHeadingInput.value = '';
  popupPlaceImageLinkInput.value = '';
}

// закрытие попапа кнопкой Esc
function handleClosePopup(e) {
  e.preventDefault();

  if (e.key === "Escape") {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}

function enableEscListener() {
  document.addEventListener('keyup', handleClosePopup);
}

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_active')
  enableEscListener();
}

//закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_active')
  document.removeEventListener('keyup', handleClosePopup);
}

popupEditButton.addEventListener('click', function () { 
  cleanForm(popupEditForm)
  inputPopupEditValue (popupEdit)
  openPopup(popupEdit)
})

popupPlaceOpen.addEventListener('click', function () { 
  cleanForm(popupPlaceForm)
  prepareForm (popupPlace)
  openPopup(popupPlace)
})


popupEditClose.addEventListener('click', () => closePopup(popupEdit))
popupPlaceClose.addEventListener('click', () => closePopup(popupPlace))

popupEdit.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
      closePopup(popupEdit)
  }
})

popupPlace.addEventListener ('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupPlace)
}
})

popupImage.addEventListener ('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupImage)
}
})

//функция редактирования информации в профиле
function handleProfileEditFormSubmit (evt) {
  evt.preventDefault()
  profileTitle.textContent = popupEditNameInput.value
  profileSubtitle.textContent = popupEditJobInput.value
  closePopup(popupEdit)
}

popupEditForm.addEventListener('submit', handleProfileEditFormSubmit);

//функция переключения лайка
function toggleLike (elementLike) {
  elementLike.classList.toggle('photo-grid__like-active')
}

//функция создания карточки
function createCard(cardData) {
  const cardElement = itemTemplate.cloneNode(true);

  cardElement.querySelector('.photo-grid__image').src = cardData.link
  cardElement.querySelector('.photo-grid__title').textContent = cardData.name
  cardElement.querySelector('.photo-grid__image').alt = cardData.name

  const likeElement = cardElement.querySelector('.photo-grid__like')
  likeElement.addEventListener('click', function() {
    toggleLike(likeElement)
  });

  const deleteButton = cardElement.querySelector('.photo-grid__delete');
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.photo-grid__item');
    listItem.remove();
  }); 

  //popupImage open
  cardElement.querySelector('.photo-grid__image').addEventListener('click', () => {
    
    picturePopupImage.src = cardData.link
    textPopupImage.textContent = cardData.name

    openPopup(popupImage)
  })

  popupImageClose.addEventListener('click', () => {
    closePopup(popupImage)
  })

  return cardElement;
}

//функция размещения карточек из массива
initialCards.forEach(function(initialCard) {
  const cardElement = createCard(initialCard)

  photoGrid.append(cardElement)
})

//функция добавления карточки через форму
function submitCardsForm (evt) {
  evt.preventDefault()
  const cardElement = createCard ( { name: popupPlaceHeadingInput.value, link: popupPlaceImageLinkInput.value });

  photoGrid.prepend(cardElement)
  closePopup(popupPlace)
}

popupPlaceForm.addEventListener('submit', submitCardsForm)