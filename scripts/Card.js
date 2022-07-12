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

  _addEventListeners() {
    this._view
      .querySelector(this._config.cardDeleteButton)
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
    this._placeImage.addEventListener("click", () => {
      this._openPlacePopup(this._name, this._image);
    });
    this._buttonLike.addEventListener("click", () => {
      this._likeCard();
    });
  }

  _deleteCard(evt) {
    evt.preventDefault();
    this._view.remove();
    this._view = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle("place__like-button_active");
  }

  render() {
    this._view = this._getTemplate();
    this._placeName = this._view.querySelector(this._config.cardName);
    this._placeName.textContent = this._name;
    this._placeImage = this._view.querySelector(this._config.cardImage);
    this._placeImage.src = this._image;
    this._placeImage.alt = this._name;
    this._buttonLike = this._view.querySelector(this._config.cardLikeButton);

    this._addEventListeners();

    return this._view;
  }
}

export default Card;
