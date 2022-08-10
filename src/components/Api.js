class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;
  }

  getCards() {
    return fetch(`${this._host}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  createCard(card) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // deleteCard(id)
}

export default Api;
