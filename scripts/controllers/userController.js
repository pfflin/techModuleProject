class UserController {
    constructor (userView, requester, baseUrl, appKey){
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";
    }
    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }
    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }
    register(data){
        if (data.username.length < 6){
            showPopup('error' , 'Username must consist of at least 6 letters');
            return;
        }
        if (data.fullname.length < 5){
            showPopup('error', 'Fullname must consist of at least 6 letters');
            return;
        }
        if (data.password != data.confirmPassword){
            showPopup('error', 'password not confirmed');
            return;
        }
        if (data.password.length < 6){
            showPopup('error','password must consist of at least 6 letters')
            return;
        }
        delete data['confirmPassword'];

        this._requester.post(this._baseServiceUrl, data,
            function successCallback(response) {
            showPopup('success', 'you have successfully registered');
                redirectUrl('#/login');
        },function errorCallback(response) {
                showPopup('error', 'you did not register');
            });

    }

    login(data){
        let _requestUrl = this._baseServiceUrl + "login";
        this._requester.post(_requestUrl, data,
            function successCallback(response) {
                sessionStorage.setItem('username', response.username);
                sessionStorage.setItem('_authToken', response._kmd.authtoken);
                sessionStorage.setItem('fullName', response.fullname);

            showPopup('success', 'you have logged in');
            redirectUrl('#/');
        },function errorCallback(response) {
            showPopup('error', 'you did not log in');
        });
    }

    logout (){
        sessionStorage.clear();
        redirectUrl('#/');
    }
}