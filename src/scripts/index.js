import "./../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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
const popupEditSelector = "#popup_edit";

const firstname = document.querySelector(".profile__name");
const nameSelector = ".profile__name";
const nameInput = document.querySelector(".popup__input_name");
const about = document.querySelector(".profile__about");
const aboutSelector = ".profile__about";
const aboutInput = document.querySelector(".popup__input_about");
const formEdit = document.querySelector("#form_edit");

const btnAdd = document.querySelector(".profile__add-button");

const popupAddSelector = "#popup_add";

const formAdd = document.querySelector("#form_add");

const placeNameInputElement = document.querySelector(".popup__input_place");
const placeImgLinkElement = document.querySelector(".popup__input_link");

const placePopupSelector = "#popup_place";
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

function handlerFormEditSubmit(evt) {
  evt.preventDefault();
  const info = popupEdit.getInputValues();
  userInfo.setUserInfo(info);
  popupEdit.close();
}

const handlerPlaceSubmit = (evt) => {
  evt.preventDefault();

  const placeName = placeNameInputElement.value;
  const placeLink = placeImgLinkElement.value;
  const el = {};
  el.name = placeName;
  el.link = placeLink;

  renderCard(el);

  popupAdd.close();
};

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  aboutSelector: aboutSelector,
});

const handleCardClick = (placeName, placeLink) => {
  const placePopup = new PopupWithImage(
    placePopupSelector,
    placeName,
    placeLink
  );
  placePopup.open();
  placePopup.setEventListeners();
};

const renderCard = (item) => {
  const place = new Card(config, item.name, item.link, handleCardClick);
  const cardElement = place.render();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  config.cardList
);
cardList.renderItems();

btnEdit.addEventListener("click", function () {
  popupEdit.open();

  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  formEditValidation.resetValidation();
});

btnAdd.addEventListener("click", function () {
  popupAdd.open();

  placeNameInputElement.value = "";
  placeImgLinkElement.value = "";
  formAddValidation.resetValidation();
});

const popupEdit = new PopupWithForm(popupEditSelector, handlerFormEditSubmit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm(popupAddSelector, handlerPlaceSubmit);
popupAdd.setEventListeners();

const formEditValidation = new FormValidator(validation, formEdit);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(validation, formAdd);
formAddValidation.enableValidation();
