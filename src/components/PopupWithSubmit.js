import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleFormDelete) {
    super(popupSelector);
    this._handleFormDelete = handleFormDelete;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._formElement.querySelector(
      ".popup__submit-button"
    );
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener(
      "click",
      this._handleFormDelete.bind(this)
    );
  }

  submitDelete() {}

  open(id, card) {
    console.log(id);
    super.open();
    this._cardData = {};
    this._cardData.id = id;
    this._cardData.card = card;
  }

  getCardData() {
    return this._cardData;
  }
}

export default PopupWithSubmit;
