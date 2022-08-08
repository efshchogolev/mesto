export const initialCards = [
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

export const btnEdit = document.querySelector(".profile__edit-button");
export const popupEditSelector = "#popup_edit";

export const nameSelector = ".profile__name";
export const nameInput = document.querySelector(".popup__input_name");
export const aboutSelector = ".profile__about";
export const aboutInput = document.querySelector(".popup__input_about");
export const formEdit = document.querySelector("#form_edit");

export const btnAdd = document.querySelector(".profile__add-button");
export const popupAddSelector = "#popup_add";
export const formAdd = document.querySelector("#form_add");
export const placeNameInputElement = document.querySelector(
  ".popup__input_place"
);
export const placeImgLinkElement = document.querySelector(".popup__input_link");
export const placePopupSelector = "#popup_place";

export const config = {
  placeTemplate: ".place-template",
  cardName: ".place__name",
  cardImage: ".place__image",
  cardList: ".elements",
  cardDeleteButton: ".place__delete-button",
  cardLikeButton: ".place__like-button",
};

export const validation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};