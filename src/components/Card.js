class Card {
  constructor(config, card, handleCardClick, deleteCardFromServer, userId) {
    this._config = config;
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = handleCardClick;
    this._deleteCardFromServer = deleteCardFromServer;
    this._userId = userId;
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
      this._handleCardClick(this._name, this._link);
    });
    this._buttonLike.addEventListener("click", () => {
      this._likeCard();
    });
  }

  async _deleteCard(evt) {
    try {
      evt.preventDefault();
      await this._deleteCardFromServer(this._card._id);
      this._view.remove();
      this._view = null;
    } catch (error) {
      console.log(error);
    }
  }

  _likeCard() {
    this._buttonLike.classList.toggle("place__like-button_active");
  }

  _checkOwner(template) {
    if (this._userId !== this._card.owner._id) {
      template.querySelector(this._config.cardDeleteButton).style.display =
        "none";
    }
    return template;
  }

  render() {
    this._view = this._checkOwner(this._getTemplate());
    this._placeName = this._view.querySelector(this._config.cardName);
    this._placeName.textContent = this._name;
    this._placeImage = this._view.querySelector(this._config.cardImage);
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
    this._buttonLike = this._view.querySelector(this._config.cardLikeButton);
    // this._checkOwner();
    this._addEventListeners();

    return this._view;
  }
}

export default Card;
