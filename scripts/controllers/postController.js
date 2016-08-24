class PostController {
    constructor(postView, requester, baseUrl, appKey){
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
    }
    showCreatePostPage(fullName, isLoggedIn){
        this._postView.showCreatePostPage(fullName, isLoggedIn);
    }
    createNewPost(data){

        if (data.content.length < 10) {
            showPopup('error', 'Content must consist of at least 10 letters');
            return;
        }
        this._requester.post(this._baseServiceUrl, data, function (responseData)
        {
            showPopup('success', 'post created');
            redirectUrl('#/')
        }, function (responseData) {
            showPopup('error', 'post not created')
        });

    }
}