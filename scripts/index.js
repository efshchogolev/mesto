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
const saveBtn = document.querySelector('.popup__submit-button')
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

const placePopupElement = document.querySelector('#popup_place')
const closeImageBtn = placePopupElement.querySelector('.popup__close-button')


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

const placeSubmitHandler = evt => {
  evt.preventDefault();

  const placeName = placeNameInputElement.value;
  const placeLink = placeImgLinkElement.value;

  addPlace(placeName, placeLink);

  formAdd.reset();
  closePopup (popupAdd);
}



const deletePlace = e => {
  const place = getPlaceByEvent (e);
  place.remove();
}

const createPlace = (placeName, placeLink) => {
  const place = placeTemplateElement.content.cloneNode(true).querySelector('.place');
  place.querySelector('.place__name').textContent = placeName;
  place.querySelector('.place__image').setAttribute('src', placeLink);
  place.querySelector('.place__image').setAttribute('alt',placeName);
  place.querySelector('.place__delete-button').addEventListener('click', deletePlace);
  place.querySelector('.place__like-button').addEventListener('click', e => {
    e.target.classList.toggle('place__like-button_active');
  });
  const placeImageElement = place.querySelector('.place__image');
  placeImageElement.addEventListener('click', () => {
    openPlacePopup(placeName, placeLink);
  });
  return place;
}
console.log(placePopupElement)

const addPlace = (placeName, placeLink) => {
  const place = createPlace(placeName, placeLink);

  placesListElement.prepend(place);
}


initialCards.forEach( el => {
  const placeName = el.name;
  const placeLink = el.link;
  addPlace(placeName,placeLink);
})



editBtn.addEventListener('click', function() {
  openPopup (popupEdit);
  nameInput.value = firstname.textContent;
  aboutInput.value = about.textContent;
})

closeEditBtn.addEventListener('click', function() {
  closePopup (popupEdit);
});



addBtn.addEventListener('click', function() {
  openPopup (popupAdd);
})

closeAddBtn.addEventListener('click', function() {
  closePopup (popupAdd);
});



const getPlaceByEvent = e => e.currentTarget.closest('.place')

const openPlacePopup = (placeName, placeLink) => {
  openPopup(placePopupElement)
  placePopupElement.querySelector('.popup__place-name').textContent = placeName;
  placePopupElement.querySelector('.popup__place-image').setAttribute('src', placeLink);
  placePopupElement.querySelector('.popup__place-image').setAttribute('alt',placeName);
}

closeImageBtn.addEventListener('click', () => {
  closePopup(placePopupElement);
})

formAdd.addEventListener('submit', placeSubmitHandler);
formEdit.addEventListener('submit', formEditSubmitHandler);
