import "./../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  btnEdit,
  popupEditSelector,
  nameSelector,
  nameInput,
  aboutSelector,
  aboutInput,
  formEdit,
  btnAdd,
  popupAddSelector,
  formAdd,
  placeNameInputElement,
  placeImgLinkElement,
  placePopupSelector,
  config,
  validation,
} from "../utils/constants";

function handlerFormEditSubmit(evt) {
  evt.preventDefault();
  const info = popupEdit.getInputValues();
  userInfo.setUserInfo(info);
  popupEdit.close();
}

const handlerPlaceSubmit = (evt) => {
  evt.preventDefault();

  const placeInfo = popupAdd.getInputValues();
  renderCard(placeInfo);

  popupAdd.close();
};

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  aboutSelector: aboutSelector,
});

const handleCardClick = (placeName, placeLink) => {
  placePopup.open(placeName, placeLink);
};

function createCard(item) {
  const place = new Card(config, item.name, item.link, handleCardClick);
  const cardElement = place.render();
  return cardElement;
}

const renderCard = (item) => {
  const cardElement = createCard(item);
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

const placePopup = new PopupWithImage(placePopupSelector);
placePopup.setEventListeners();
