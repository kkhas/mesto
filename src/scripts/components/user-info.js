export default class UserInfo {
    constructor(name, job) {
    this._name = name;
    this._job = job;
    this._profileTitle = document.querySelector('.profile__title')
    this._profileSubtitle = document.querySelector('.profile__subtitle') 
    }

    getUserInfo() {
        const values = {
            name: this._name = document.querySelector('.profile__title').textContent,
            job: this._job = document.querySelector('.profile__subtitle').textContent
        }
        
        return values
    }

    setUserInfo(data) {
        this._profileTitle.textContent = data.name 
        this._profileSubtitle.textContent = data.job
    }
  }