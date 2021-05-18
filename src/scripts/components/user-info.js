export default class UserInfo {
    constructor({name, job}) {
    this._name = name;
    this._job = job;      
    }

    getUserInfo() {
        const values = {
            name: this._name = document.querySelector('.profile__title').textContent,
            job: this._job = document.querySelector('.profile__subtitle').textContent
        }
        
        return values
    }

    setUserInfo(data) {
        const profileTitle = document.querySelector('.profile__title')
        const profileSubtitle = document.querySelector('.profile__subtitle')

        profileTitle.textContent = data.name 
        profileSubtitle.textContent = data.job
    }
  }