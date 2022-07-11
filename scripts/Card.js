class Card {
  constructor(config, name, image, openPlacePopup) {
    this._config = config;
    this._name = name;
    this._image = image;
    this._openPlacePopup = openPlacePopup;
  }

  _getTemplate() {
    return document
      .querySelector(this._config.placeTemplate)
      .content.children[0].cloneNode(true);
  }

  _addEvemtListeners() {
    this._view
      .querySelector(this._config.cardDeleteButton)
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
    this._view
      .querySelector(this._config.cardLikeButton)
      .addEventListener("click", (evt) => {
        this._likeCard(evt);
      });
    this._view
      .querySelector(this._config.cardImage)
      .addEventListener("click", () => {
        this._openPlacePopup(this._name, this._image);
      });
  }

  _deleteCard(evt) {
    evt.preventDefault();
    this._view.remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle("place__like-button_active");
  }

  render(cardsList) {
    this._view = this._getTemplate();
    const placeName = this._view.querySelector(this._config.cardName);
    placeName.textContent = this._name;
    const placeImage = this._view.querySelector(this._config.cardImage);
    placeImage.src = this._image;
    placeImage.alt = this._name;
    cardsList.append(this._view);

    this._addEvemtListeners();
  }
}

export default Card;
