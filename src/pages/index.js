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
  popupAvatarSelector,
  btnAvatar,
  formAvatar,
} from "../utils/constants";
import Api from "../components/Api.js";

let userId;

const api = new Api(config.host, config.token);

function handlerFormEditSubmit(evt) {
  evt.preventDefault();
  popupEdit.setLoader();
  const info = popupEdit.getInputValues();
  api
    .updateUserInfo(info)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => popupEdit.close())
    .catch((err) => console.log(err))
    .finally(() => {
      popupEdit.removeLoader();
    });
}

const handlerPlaceSubmit = (evt) => {
  evt.preventDefault();
  const placeInfo = popupAdd.getInputValues();
  popupAdd.setLoader();
  api
    .createCard(placeInfo)
    .then((item) => {
      renderCard(item);
    })
    .then(() => {
      popupAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAdd.removeLoader();
    });
};

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarLink = popupAvatar.getInputValues();
  popupAvatar.setLoader();
  api
    .updateUserAvatar(avatarLink.link)
    .then((avatar) => {
      userInfo.setUserInfo(avatar);
    })
    .then(() => {
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatar.removeLoader();
    });
}

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  aboutSelector: aboutSelector,
  avatarSelector: avatarSelector,
});

function deleteCard({ id, card }) {
  return api
    .deleteCard(id)
    .then(card.remove(), (card = null))
    .catch((err) => console.log(err));
}

function handleFormDelete(evt) {
  evt.preventDefault();
  deleteCard(popupSubmit.getCardData());

  popupSubmit.close();
}

function openDeletePopup(id, card) {
  popupSubmit.open(id, card);
}

const handleCardClick = (placeName, placeLink) => {
  placePopup.open(placeName, placeLink);
};

function handleLikeCard(id) {
  return api.setLike(id);
}

function handleDislikeCard(id) {
  return api.deleteLike(id);
}

function createCard(item) {
  const place = new Card(
    config,
    item,
    handleCardClick,
    openDeletePopup,
    userId,
    handleLikeCard,
    handleDislikeCard
  );
  const cardElement = place.render();
  return cardElement;
}

const renderCard = (item) => {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
};

function handleRenderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    if (submitButton.classList.contains("popup__submit-button_add")) {
      submitButton.textContent = "Создать";
    } else {
      submitButton.textContent = "Сохранить";
    }
  }
}

const cardList = new Section(
  {
    renderer: renderCard,
  },
  config.cardList
);

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

btnAvatar.addEventListener("click", function () {
  popupAvatar.open();
  formAvatarValidation.resetValidation();
});

const popupSubmit = new PopupWithSubmit(popupDeleteSelector, handleFormDelete);
popupSubmit.setEventListeners();

const popupAvatar = new PopupWithForm(
  popupAvatarSelector,
  handleAvatarSubmit,
  handleRenderLoading
);
popupAvatar.setEventListeners();

const popupEdit = new PopupWithForm(
  popupEditSelector,
  handlerFormEditSubmit,
  handleRenderLoading
);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm(
  popupAddSelector,
  handlerPlaceSubmit,
  handleRenderLoading
);
popupAdd.setEventListeners();

const formEditValidation = new FormValidator(validation, formEdit);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(validation, formAdd);
formAddValidation.enableValidation();
const formAvatarValidation = new FormValidator(validation, formAvatar);
formAvatarValidation.enableValidation();

const placePopup = new PopupWithImage(placePopupSelector);
placePopup.setEventListeners();

Promise.all([api.getUserInfoFromServer(), api.getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);

    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));
