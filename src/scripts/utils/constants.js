const photoGrid = '.photo-grid';
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardAddButton = document.querySelector('.profile__add');
const popupEditNameInput = document.querySelector('.popup__input_value_name')
const popupEditJobInput = document.querySelector('.popup__input_value_title')
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
const avatarElement = document.querySelector('.profile__avatar')
const avatarEditElement = document.querySelector('.profile__avatar-container')
const popupEdit = document.querySelector('.popup_type_edit')
const popupConfirm = document.querySelector('.popup_type_confirm')
const popupAvatarElement = document.querySelector('.popup_type_edit-avatar')

export { 
    avatarEditElement, 
    photoGrid, 
    profileEditButton, 
    newCardAddButton, 
    popupEditNameInput, 
    popupEditJobInput, 
    profileName, 
    profileAbout, 
    avatarElement,
    popupConfirm,
    popupEdit,
    popupAvatarElement }