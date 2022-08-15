import "./../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import {
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

function handlerFormEditSubmit(inputs) {
  popupEdit.toggleLoader(true);

  api
    .updateUserInfo(inputs)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => popupEdit.close())
    .catch((err) => console.log(err))
    .finally(() => {
      popupEdit.toggleLoader(false);
    });
}

const handlerPlaceSubmit = (inputs) => {
  popupAdd.toggleLoader(true);
  api
    .createCard(inputs)
    .then((item) => {
      renderCard(item);
    })
    .then(() => {
      popupAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAdd.toggleLoader(false);
    });
};

function handleAvatarSubmit(inputs) {
  popupAvatar.toggleLoader(true);
  api
    .updateUserAvatar(inputs.link)
    .then((avatar) => {
      userInfo.setUserInfo(avatar);
    })
    .then(() => {
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatar.toggleLoader(false);
    });
}

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  aboutSelector: aboutSelector,
  avatarSelector: avatarSelector,
});

function handleFormDelete(cardData) {
  api
    .deleteCard(cardData.id)
    .then(cardData.card.submitDeleteCard())
    .then(popupSubmit.close())
    .catch((err) => console.log(err));
}

function openDeletePopup(id, card) {
  popupSubmit.open(id, card);
}

const handleCardClick = (placeName, placeLink) => {
  placePopup.open(placeName, placeLink);
};

function handleUpdateCardLikes(id, isLiked, card) {
  if (!isLiked) {
    api.setLike(id).then((res) => {
      card.updateLikes(res.likes);
    });
  } else {
    api.deleteLike(id).then((res) => {
      card.updateLikes(res.likes);
    });
  }
}

function createCard(item) {
  const place = new Card(
    config,
    item,
    handleCardClick,
    openDeletePopup,
    userId,
    handleUpdateCardLikes
  );
  const cardElement = place.render();
  return cardElement;
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

const popupAvatar = new PopupWithForm(popupAvatarSelector, handleAvatarSubmit);
popupAvatar.setEventListeners();

const popupEdit = new PopupWithForm(popupEditSelector, handlerFormEditSubmit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm(popupAddSelector, handlerPlaceSubmit);
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
