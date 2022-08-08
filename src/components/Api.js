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
}

export default Api;
