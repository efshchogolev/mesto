import "./../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  btnEdit,
  popupEditSelector,
  nameSelector,
  nameInput,
  aboutSelector,
  avatarSelector,
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
  popupDeleteSelector,
} from "../utils/constants";
import Api from "../components/Api.js";

let userId;

const api = new Api(config.host, config.token);

function handlerFormEditSubmit(evt) {
  evt.preventDefault();
  const info = popupEdit.getInputValues();

  api.updateUserInfo(info).then((data) => {
    userInfo.setUserInfo(data);
  });

  popupEdit.close();
}

const handlerPlaceSubmit = (evt) => {
  evt.preventDefault();

  const placeInfo = popupAdd.getInputValues();
  addCard(placeInfo);

  popupAdd.close();
};

api.getUserInfoFromServer().then((item) => {
  userInfo.setUserInfo(item);
  userId = item._id;
});

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  aboutSelector: aboutSelector,
  avatarSelector: avatarSelector,
});

function deleteCard({ id, card }) {
  return api
    .deleteCard(id)
    .then(console.log(card), card.remove(), (card = null))
    .catch((err) => console.log(err));
}

function handleFormDelete(evt) {
  evt.preventDefault();
  console.log(popupSubmit.getCardData());
  deleteCard(popupSubmit.getCardData());

  popupSubmit.close();
}

function openDeletePopup(id, card) {
  popupSubmit.open(id, card);
}

const handleCardClick = (placeName, placeLink) => {
  placePopup.open(placeName, placeLink);
};

function createCard(item) {
  const place = new Card(
    config,
    item,
    handleCardClick,
    openDeletePopup,
    userId
  );
  const cardElement = place.render();
  return cardElement;
}

function addCard(card) {
  api.createCard(card).then((item) => {
    renderCard(item);
  });
}

const renderCard = (item) => {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    renderer: renderCard,
  },
  config.cardList
);

api.getCards().then((items) => {
  cardList.renderItems(items);
});

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

const popupSubmit = new PopupWithSubmit(popupDeleteSelector, handleFormDelete);
popupSubmit.setEventListeners();

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
