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

  getInputValues() {
    const inputValues = {};
    this._inputs.forEach((item) => {
      console.log(item.name);
      console.log(item.value);
      inputValues[item.name] = item.value;
    });
    console.log(inputValues);
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
    this._inputs.forEach((input) => {
      input.value = "";
    });
    if (this._popupSelector === "#popup_add") {
      this._formElement.reset();
    }
  }
}

export default PopupWithForm;
