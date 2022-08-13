class Card {
  constructor(
    config,
    card,
    handleCardClick,
    deleteCardFromServer,
    userId,
    handleLikeCard,
    handleDislikeCard,
    handleGetLikes
  ) {
    this._config = config;
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = handleCardClick;
    this._deleteCardFromServer = deleteCardFromServer;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
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
        this._deleteCard(this._card);
      });
    this._placeImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._buttonLike.addEventListener("click", () => {
      this._changeLikeStatus();
    });
  }

  _deleteCard() {
    this._deleteCardFromServer(this._card._id, this._view);
  }

  _checkOwner(template) {
    if (this._userId !== this._card.owner._id) {
      template.querySelector(this._config.cardDeleteButton).style.display =
        "none";
    }
    return template;
  }

  _changeLikeStatus() {
    const isLiked = this._card.likes.some((user) => user._id === this._userId);
    if (isLiked) {
      this._handleDislikeCard(this._card._id).then((res) => {
        console.log(res);
        this._view.querySelector(this._config.cardLikes).textContent =
          res.likes.length;
        this._card.likes = res.likes;
      });
    } else {
      this._handleLikeCard(this._card._id).then((res) => {
        this._view.querySelector(this._config.cardLikes).textContent =
          res.likes.length;
        this._card.likes = res.likes;
      });
    }
    this._buttonLike.classList.toggle("place__like-button_active");
  }

  _checkInitialOwnerLike() {
    if (this._card.likes.some((user) => user._id === this._userId)) {
      this._buttonLike.classList.add("place__like-button_active");
    }
  }

  _setLikes() {
    this._view.querySelector(this._config.cardLikes).textContent =
      this._card.likes.length;
  }

  render() {
    this._view = this._checkOwner(this._getTemplate());
    this._placeName = this._view.querySelector(this._config.cardName);
    this._placeName.textContent = this._name;
    this._placeImage = this._view.querySelector(this._config.cardImage);
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
    this._buttonLike = this._view.querySelector(this._config.cardLikeButton);
    this._setLikes();
    this._checkInitialOwnerLike();
    this._addEventListeners();

    return this._view;
  }
}

export default Card;
