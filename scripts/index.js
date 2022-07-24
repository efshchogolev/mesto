import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const btnEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#popup_edit");
const btnCloseEdit = document.querySelector("#close_edit");
const firstname = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_name");
const about = document.querySelector(".profile__about");
const aboutInput = document.querySelector(".popup__input_about");
const formEdit = document.querySelector("#form_edit");

const btnAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector("#popup_add");
const btnCloseAdd = document.querySelector("#close_add");
const formAdd = document.querySelector("#form_add");

const placeNameInputElement = document.querySelector(".popup__input_place");
const placeImgLinkElement = document.querySelector(".popup__input_link");
const placePopupElement = document.querySelector("#popup_place");
const btnCloseImage = placePopupElement.querySelector(".popup__close-button");
const placePopupImageElement = placePopupElement.querySelector(
  ".popup__place-image"
);
const placePopupNameElement =
  placePopupElement.querySelector(".popup__place-name");
const popups = document.querySelectorAll(".popup");

const config = {
  placeTemplate: ".place-template",
  cardName: ".place__name",
  cardImage: ".place__image",
  cardList: ".elements",
  cardDeleteButton: ".place__delete-button",
  cardLikeButton: ".place__like-button",
};

const validation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};

const cardContainer = document.querySelector(config.cardList);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_isOpen")) {
      closePopup(popup);
    }
  });
});

const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_isOpen"));
  }
};

function closePopup(popupElement) {
  popupElement.classList.remove("popup_isOpen");
  document.removeEventListener("keydown", closeByEsc);
}

function openPopup(popupElement) {
  document.addEventListener("keydown", closeByEsc);
  popupElement.classList.add("popup_isOpen");
}

function handlerFormEditSubmit(evt) {
  evt.preventDefault();
  closePopup(popupEdit);
  firstname.textContent = nameInput.value;
  about.textContent = aboutInput.value;
}

const handlerPlaceSubmit = (evt) => {
  evt.preventDefault();

  const placeName = placeNameInputElement.value;
  const placeLink = placeImgLinkElement.value;
  const el = {};
  el.name = placeName;
  el.link = placeLink;

  addPlace(el);

  formAdd.reset();
  closePopup(popupAdd);
};

const addPlace = (el) => {
  const place = createPlace(el);
  cardContainer.prepend(place);
};

const openPlacePopup = (placeName, placeLink) => {
  openPopup(placePopupElement);
  placePopupNameElement.textContent = placeName;
  placePopupImageElement.setAttribute("src", placeLink);
  placePopupImageElement.setAttribute("alt", placeName);
};

// const createPlace = (el) => {
//   const place = new Card(config, el.name, el.link, openPlacePopup);
//   const placeElement = place.render();
//   return placeElement;
// };

// initialCards.forEach((el) => {
//   addPlace(el);
// });

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const place = new Card(config, item.name, item.link, openPlacePopup);
      const cardElement = place.render();
      cardList.addItem(cardElement);
    },
  },
  config.cardList
);
cardList.renderItems();

btnEdit.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = firstname.textContent;
  aboutInput.value = about.textContent;
  formEditValidation.resetValidation();
});

btnCloseEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});

btnAdd.addEventListener("click", function () {
  openPopup(popupAdd);
  placeNameInputElement.value = "";
  placeImgLinkElement.value = "";
  formAddValidation.resetValidation();
});

btnCloseAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});

btnCloseImage.addEventListener("click", () => {
  closePopup(placePopupElement);
});

formAdd.addEventListener("submit", handlerPlaceSubmit);
formEdit.addEventListener("submit", handlerFormEditSubmit);

const formEditValidation = new FormValidator(validation, formEdit);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(validation, formAdd);
formAddValidation.enableValidation();
