let formEdit = document.querySelector('.profile__edit-button')
let overlay = document.querySelector('.overlay')
let popupClose = overlay.querySelector('.overlay__popup-close')

let togglePopup = () => {
    overlay.classList.toggle('overlay_active')
}

formEdit.addEventListener('click', togglePopup)
popupClose.addEventListener('click', togglePopup)
overlay.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        togglePopup()
    }
})

let formElement = overlay.querySelector('.overlay__popup')


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    
    let nameInput = overlay.querySelector('.overlay__popup-name')
    let jobInput = overlay.querySelector('.overlay__popup-title')
    let profileTitle = document.querySelector('.profile__title')
    let profileSubtitle = document.querySelector('.profile__subtitle')
    
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    togglePopup()
}

formElement.addEventListener('submit', handleFormSubmit);