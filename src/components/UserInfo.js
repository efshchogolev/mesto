class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id;
  }

  // getUserInfo() {
  //   const userData = {};
  //   userData.name = this._name.textContent;
  //   userData.about = this._about.textContent;
  //   return userData;
  // }
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}

export default UserInfo;
