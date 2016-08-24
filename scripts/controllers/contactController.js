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
        if (data.content.length < 10) {
            showPopup('error', 'Content must consist of at least 10 letters');
            return;
        }
        this._requester.post(this._baseServiceUrl, data, function (responseData)
        {
            showPopup('success', 'success');
            redirectUrl('#/')
        }, function (responseData) {
            showPopup('error', 'error')
        });

    }
}