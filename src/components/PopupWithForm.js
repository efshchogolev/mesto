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
  }

  getInputValues() {
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
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
