class ContactController {
    constructor(contactView, requester, baseUrl, appKey){
        this._contactView = contactView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/UserComments";
    }
    showContactPage(fullName, isLoggedIn){
        this._contactView.showContactPage(fullName, isLoggedIn);
    }
    createNewContact(data){
        this._requester.post(this._baseServiceUrl, data, function (responseData) {
            showPopup('success', 'post created');
            redirectUrl('#/')
        }, function (responseData) {
            showPopup('error', 'post not created')
        });

    }
}