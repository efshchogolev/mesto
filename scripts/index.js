const editBtn = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closeBtn = document.querySelector('.popup__close-button')
const saveBtn = document.querySelector('.popup__submit-button')

const firstname = document.querySelector('.profile__name')
const nameInput = document.querySelector('.popup__input_name')
const about = document.querySelector('.profile__about')
const aboutInput = document.querySelector('.popup__input_about')
const form = document.querySelector('.popup__form')

console.log(editBtn)
console.log(popup)

function closePopup (popupElement) {
  popupElement.classList.remove('popup_isOpen');
}

function openPopup (popupElement) {
  popupElement.classList.add('popup_isOpen');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  closePopup (popup);
  firstname.textContent = nameInput.value;
  about.textContent = aboutInput.value
};

editBtn.addEventListener('click', function() {
  openPopup (popup);
  nameInput.value = firstname.textContent;
  aboutInput.value = about.textContent;
})

closeBtn.addEventListener('click', function() {
  closePopup (popup);
});

form.addEventListener('submit', formSubmitHandler);
