export default class UserInfo {
    constructor(profileTitleSelector, profileSubtitleSelector) {
        this._profileTitle = document.querySelector(profileTitleSelector);
        this._profileSubtitle = document.querySelector(profileSubtitleSelector);
    }

    getUserId() {
        return this._userID
    }
    
    getUserInfo() {
        const values = {
            name: this._name = this._profileTitle.textContent,
            job: this._job = this._profileSubtitle.textContent
        }
        
        return values
    }
    
    setUserInfo(data) {
        this._profileTitle.textContent = data.name ;
        this._profileSubtitle.textContent = data.about;
    }
}