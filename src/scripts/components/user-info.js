export default class UserInfo {
    constructor(name, job) {
    this._profileTitle = document.querySelector(name);
    this._profileSubtitle = document.querySelector(job);
    }

    getUserInfo() {
        const values = {
            name: this._name = this._profileTitle.textContent,
            job: this._job = this._profileSubtitle.textContent
        }
        
        return values
    }

    setUserInfo(data) {
        this._profileTitle.textContent = data.name 
        this._profileSubtitle.textContent = data.job
    }
  }