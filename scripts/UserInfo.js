class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._name.textContent;
    userData.about = this._about.textContent;
    return userData;
  }
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}

export default UserInfo;
