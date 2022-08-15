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

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((item) => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  toggleLoader(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      if (this._submitButton.classList.contains("popup__submit-button_add")) {
        this._submitButton.textContent = "Создать";
      } else {
        this._submitButton.textContent = "Сохранить";
      }
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
