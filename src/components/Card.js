class Card {
  constructor(
    config,
    card,
    handleCardClick,
    deleteCardFromServer,
    userId,
    handleUpdateCardLikes
  ) {
    this._config = config;
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = handleCardClick;
    this._deleteCardFromServer = deleteCardFromServer;
    this._handleUpdateCardLikes = handleUpdateCardLikes;
    this._userId = userId;
    this._likes = this._card.likes;
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
    this._likeButton.addEventListener("click", () => {
      this._handleUpdateCardLikes(this._card._id, this._isLiked(), this);
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

  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _updateLikesView() {
    this._cardLikeCount.textContent = this._likes.length;
    this._likeButton.classList.toggle(
      this._config.cardLikeActiveClass,
      this._isLiked()
    );
  }

  updateLikes(likes) {
    console.log(this._likes);
    this._likes = likes;
    console.log(this._likes);
    this._updateLikesView();
  }

  render() {
    this._view = this._checkOwner(this._getTemplate());
    this._placeName = this._view.querySelector(this._config.cardName);
    this._placeName.textContent = this._name;
    this._placeImage = this._view.querySelector(this._config.cardImage);
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
    this._likeButton = this._view.querySelector(this._config.cardLikeButton);
    this._cardLikeCount = this._view.querySelector(this._config.cardLikes);
    this._updateLikesView();
    this._addEventListeners();

    return this._view;
  }
}

export default Card;
