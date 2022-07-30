import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(
      ".popup__place-image"
    );
    this._nameElement = this._popupElement.querySelector(".popup__place-name");
  }
  open(placeName, placeLink) {
    super.open();
    this._imageElement.setAttribute("src", placeLink);
    this._nameElement.textContent = placeName;
    this._imageElement.setAttribute("alt", placeName);
  }
}

export default PopupWithImage;
