class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButtonElement = this._popupElement.querySelector(
      ".popup__close-button"
    );
  }
  open() {
    this._popupElement.classList.add("popup_isOpen");
  }

  close() {
    this._popupElement.classList.remove("popup_isOpen");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleButtonClick() {
    if (this._popupElement.classList.contains("popup_isOpen")) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButtonElement.addEventListener("click", () => {
      this._handleButtonClick();
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_isOpen")) {
        this.close();
      }
    });
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }
}
export default Popup;
