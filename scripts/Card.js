class Card {
  constructor(config, name, image) {
    this._config = config;
    this._name = name;
    this._image = image;
  }

  _getTemplate() {
    return document
      .querySelector(this._config.placeTemplate)
      .content.children[0].cloneNode(true);
  }

  render(cardsList) {
    this._view = this._getTemplate();
    const placeName = this._view.querySelector(this._config.cardName);
    placeName.textContent = this._name;
    const placeImage = this._view.querySelector(this._config.cardImage);
    placeImage.src = this._image;
    placeImage.alt = this._name;
    cardsList.append(this._view);
  }
}

export default Card;
