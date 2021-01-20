let formEdit = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupClose = popup.querySelector('.popup__close')
let formElement = popup.querySelector('.popup__container')
let nameInput = popup.querySelector('.popup__input_value_name')
let jobInput = popup.querySelector('.popup__input_value_title')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')

let openPopup = () => {
    popup.classList.add('popup_active')
    nameInput.value = profileTitle.textContent
    jobInput.value = profileSubtitle.textContent
}

let closePopup = () => {
    popup.classList.remove('popup_active')
}

formEdit.addEventListener('click', openPopup)
popupClose.addEventListener('click', closePopup)
popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup()
    }
})

function handleFormSubmit (evt) {
    evt.preventDefault();  
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    closePopup()
}

formElement.addEventListener('submit', handleFormSubmit);