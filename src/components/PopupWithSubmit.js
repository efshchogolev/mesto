import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleFormDelete) {
    super(popupSelector);
    this._hadnleFormDelete = handleFormDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", this._submitDelete());
  }

  _submitDelete() {
    return true;
  }
}

export default PopupWithSubmit;
