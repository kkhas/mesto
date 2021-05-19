import '../../pages/index.css'
import { Card } from '../components/card.js'; 
import { Section } from '../components/section.js';
import { initialCards} from '../utils/initial-cards.js';
import { photoGrid, 
  profileEditButton, 
  newCardAddButton } from '../utils/constants.js';
import PopupWithForm from '../components/popup-with-form.js';
import PopupWithImage from '../components/popup-with-image.js';
import { FormValidator, validationConfig } from '../components/form-validator.js';
import UserInfo from '../components/user-info.js';

const popupImage = new PopupWithImage('.popup_type_image')
popupImage.setEventListeners();

function cardImageClickHandler(link, name) {
  popupImage.openPopup(link, name)
};

//добавление карточек из массива
const initialCardsList = new Section ({ 
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, cardImageClickHandler)
   
    return cardElement.render()
  }}, 
  photoGrid
);

initialCardsList.renderItems();

//функция добавления карточки через форму
function submitCardsForm (data) {
  const newCard = new Section (
    {}, 
    photoGrid
  );
  const card = new Card (data, cardImageClickHandler)
  newCard.addItem(card.render())
}

const newPlaceForm = new PopupWithForm('.popup_type_new-place', submitCardsForm)

//функция редактирования информации в профиле
function handleProfileEditFormSubmit (data) {
  const userInfo = new UserInfo(data)
  userInfo.setUserInfo(data)
}

const profileEditForm = new PopupWithForm('.popup_type_edit', handleProfileEditFormSubmit)
const userInfo = new UserInfo({})

const popupPlaceFormValidation = new FormValidator(validationConfig, document.querySelector('.popup__form_new-place'))
popupPlaceFormValidation.enableValidation()

const popupEditFormValidation = new FormValidator(validationConfig, document.querySelector('.popup__form_edit')) 
popupEditFormValidation.enableValidation()


profileEditButton.addEventListener('click', () => {
  popupEditFormValidation.resetForm()
  profileEditForm.pasteUserData(userInfo.getUserInfo())
  profileEditForm.openPopup()
});

newCardAddButton.addEventListener('click', () => {
  newPlaceForm.openPopup()
  popupPlaceFormValidation.resetForm()
});