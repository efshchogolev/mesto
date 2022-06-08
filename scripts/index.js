const editBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#popup_edit');
const closeEditBtn = document.querySelector('#close_edit');

const firstname = document.querySelector('.profile__name');
const nameInput = document.querySelector('.popup__input_name');
const about = document.querySelector('.profile__about');
const aboutInput = document.querySelector('.popup__input_about');
const formEdit = document.querySelector('#form_edit');

const addBtn = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popup_add');
const closeAddBtn = document.querySelector('#close_add')
const formAdd = document.querySelector('#form_add')


function closePopup (popupElement) {
  popupElement.classList.remove('popup_isOpen');
}

function openPopup (popupElement) {
  popupElement.classList.add('popup_isOpen');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  closePopup (popupEdit);
  firstname.textContent = nameInput.value;
  about.textContent = aboutInput.value
};

editBtn.addEventListener('click', function() {
  openPopup (popupEdit);
  nameInput.value = firstname.textContent;
  aboutInput.value = about.textContent;
})

closeEditBtn.addEventListener('click', function() {
  closePopup (popupEdit);
});

formEdit.addEventListener('submit', formSubmitHandler);


function formSubmitHandler (evt) {
  evt.preventDefault();
  closePopup (popupAdd);
  // firstname.textContent = nameInput.value;
  // about.textContent = aboutInput.value
};

addBtn.addEventListener('click', function() {
  openPopup (popupAdd);
})

closeAddBtn.addEventListener('click', function() {
  closePopup (popupAdd);
});

formAdd.addEventListener('submit', formSubmitHandler);
