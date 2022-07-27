import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputs = this._formElement.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector(
      ".popup__submit-button"
    );
    console.log(this._submitButton);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((item) => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener(
      "click",
      this._handleFormSubmit.bind(this)
    );
  }
  close() {
    this._popupElement.classList.remove("popup_isOpen");
    this._inputs.forEach((input) => {
      input.value = "";
    });
  }
}

export default PopupWithForm;
