export default class UserInfo {
    constructor(profileTitleSelector, profileSubtitleSelector, profileAvatarSelector) {
        this._profileTitle = profileTitleSelector;
        this._profileSubtitle = profileSubtitleSelector;
        this._profileAvatar = profileAvatarSelector;
    }

    getUserId() {
        return this._userID
    }
    
    getUserInfo() {
        const values = {
            name: this._name = this._profileTitle.textContent,
            job: this._job = this._profileSubtitle.textContent,
            avatar: this._avatar = this._profileAvatar.src
        }
        
        return values
    }
    
    setUserInfo(data) {
        if(data.name) {
            this._profileTitle.textContent = data.name
        }
        if(data.about) {
            this._profileSubtitle.textContent = data.about
        }
        if(data.avatar) {
            this._profileAvatar.src = data.avatar
        }
    }
}