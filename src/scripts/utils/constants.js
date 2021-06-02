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
const popupAvatarElement = document.querySelector('.popup_type_edit-avatar')
const popupConfirm = document.querySelector('.popup_type_confirm')
const popupNewPlace = document.querySelector(".popup_type_new-place")
const popupImageSelector = document.querySelector('.popup_type_image')
const popupProfileEditForm = document.querySelector('.popup__form_edit')
const avatarEditForm = document.querySelector('.popup__form_edit-avatar')
const popupNewPlaceForm = document.querySelector('.popup__form_new-place')
const profileBtnValue = "Сохранить"
const profileBtnNewValue = "Сохранение..."
const newPlaceBtnValue = "Создать"
const newPlaceBtnNewValue = "Создание..." 
const itemTemplate = document.querySelector(".item_template")

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
    popupEdit,
    popupAvatarElement,
    popupConfirm,
    popupNewPlace,
    popupImageSelector,
    popupProfileEditForm,
    avatarEditForm,
    popupNewPlaceForm,
    profileBtnValue,
    profileBtnNewValue,
    newPlaceBtnValue,
    newPlaceBtnNewValue,
    itemTemplate}