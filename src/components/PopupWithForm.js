import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleRenderLoading) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputs = this._formElement.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector(
      ".popup__submit-button"
    );
    this._handleRenderLoading = handleRenderLoading;
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
    this._formElement.addEventListener(
      "submit",
      this._handleFormSubmit.bind(this)
    );
  }
  close() {
    super.close();
    this._formElement.reset();
  }

  setLoader() {
    this._handleRenderLoading(true, this._submitButton);
  }

  removeLoader() {
    this._handleRenderLoading(false, this._submitButton);
  }
}

export default PopupWithForm;
