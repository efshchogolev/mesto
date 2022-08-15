export const btnEdit = document.querySelector(".profile__edit-button");
export const popupEditSelector = "#popup_edit";

export const popupDeleteSelector = "#popup_delete";

export const popupAvatarSelector = "#popup_avatar";
export const btnAvatar = document.querySelector(".profile__avatar");
export const formAvatar = document.querySelector("#form_avatar");

export const nameSelector = ".profile__name";
export const nameInput = document.querySelector(".popup__input_name");
export const aboutSelector = ".profile__about";
export const avatarSelector = ".profile__avatar";
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
  cardLikes: ".place__like-count",
  cardList: ".elements",
  cardDeleteButton: ".place__delete-button",
  cardLikeButton: ".place__like-button",
  cardLikeActiveClass: "place__like-button_active",
  host: "https://mesto.nomoreparties.co/v1/cohort-47",
  token: "ad5a4fe9-6249-4900-9757-39fd298866ec",
};

export const validation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};
