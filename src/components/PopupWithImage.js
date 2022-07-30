import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector, placeName, placeLink) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._imageElement = this._popupElement.querySelector(
      ".popup__place-image"
    );
    this._nameElement = this._popupElement.querySelector(".popup__place-name");
    this._name = placeName;
    this._link = placeLink;
  }
  open() {
    super.open();
    this._imageElement.setAttribute("src", this._link);
    this._nameElement.textContent = this._name;
    this._imageElement.setAttribute("alt", this._name);
  }
}

export default PopupWithImage;
