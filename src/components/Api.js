class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;

    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "content-type": "application/json",
    };
  }

  getCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  getUserInfoFromServer() {
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }

  createCard(card) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._getJsonOrError);
  }

  deleteCard(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOrError);
  }
}

export default Api;
