
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

const placeTemplateElement = document.querySelector('.place-template');
const placesListElement = document.querySelector('.elements');
const placeNameInputElement = document.querySelector('.popup__input_place');
const placeImgLinkElement = document.querySelector('.popup__input_link');

const createPlace = (placeName, placeLink) => {
  const place = placeTemplateElement.content.cloneNode(true).querySelector('.place');
  place.querySelector('.place__name').textContent = placeName;
  place.querySelector('.place__image').setAttribute('src', placeLink);
  return place;
}

const addPlace = (placeName, placeLink) => {
  const place = createPlace(placeName, placeLink);

  placesListElement.prepend(place);
}

const placeSubmitHandler = evt => {
  evt.preventDefault();

  const placeName = placeNameInputElement.value;
  const placeLink = placeImgLinkElement.value;

  addPlace(placeName, placeLink);

  formAdd.reset();
}

for (let i=0; i < initialCards.length; i++) {
  const placeName = initialCards[i].name;
  const placeLink = initialCards[i].link;
  addPlace(placeName,placeLink);
}

formAdd.addEventListener('submit', placeSubmitHandler);
