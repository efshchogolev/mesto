
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

const placeTemplateElement = document.querySelector('.place-template');
const placesListElement = document.querySelector('.elements');
const placeNameInputElement = document.querySelector('.popup__input_place');
const placeImgLinkElement = document.querySelector('.popup__input_link');

function closePopup (popupElement) {
  popupElement.classList.remove('popup_isOpen');
}

function openPopup (popupElement) {
  popupElement.classList.add('popup_isOpen');
}

function formEditSubmitHandler (evt) {
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

formEdit.addEventListener('submit', formAddSubmitHandler);

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  closePopup (popupAdd);
};

addBtn.addEventListener('click', function() {
  openPopup (popupAdd);
})

closeAddBtn.addEventListener('click', function() {
  closePopup (popupAdd);
});

formAdd.addEventListener('submit', formAddSubmitHandler);

const deletePlace = e => {
  const place = getPlaceByEvent (e);
  place.remove();
}


const getPlaceByEvent = e => e.currentTarget.closest('.place')


const placePopupElement = document.querySelector('#popup_place')
// let placePopupName = placePopupElement.querySelector('.popup__place-name');
// let placePopupLink = placePopupElement.querySelector('.popup__place-image').getAttribute('src')

const openPlacePopup = (placeName, placeLink) => {
  openPopup(placePopupElement)
  placePopupElement.querySelector('.popup__place-name').textContent = placeName;
  placePopupElement.querySelector('.popup__place-image').setAttribute('src', placeLink);
}

const closeImageBtn = placePopupElement.querySelector('.popup__close-button')

closeImageBtn.addEventListener('click', () => {
  closePopup(placePopupElement);
})

const createPlace = (placeName, placeLink) => {
  const place = placeTemplateElement.content.cloneNode(true).querySelector('.place');
  place.querySelector('.place__name').textContent = placeName;
  place.querySelector('.place__image').setAttribute('src', placeLink);
  place.querySelector('.place__delete-button').addEventListener('click', deletePlace)
  place.querySelector('.place__like-button').addEventListener('click', e => {
    e.target.classList.toggle('place__like-button_active');
  });
  const popupPlaceName = placeName;
  const popupPlaceLink = placeLink;
  const placeImageElement = place.querySelector('.place__image');
  placeImageElement.addEventListener('click', () => {
    openPlacePopup(popupPlaceName, popupPlaceLink);
  });
  return place;
}
console.log(placePopupElement)

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

initialCards.forEach( el => {
  const placeName = el.name;
  const placeLink = el.link;
  addPlace(placeName,placeLink);
})

formAdd.addEventListener('submit', placeSubmitHandler);


