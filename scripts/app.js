(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_rkOdyyWO"; // Place your appKey from Kinvey here...
    let appSecret = "ae0207bc84504a38bf453e824e4b7ca1"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "86691f2b-bc88-4d3b-88f4-4f60bc7ee67b.jCFL1T25WHEf8NZJZW+OA19taqhc2x51RwKUCQ/S9RM="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    let requester = new Requester(authService);

    authService.initAuthorizationType("Kinvey");

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController
    let homeView = new HomeView(mainContentSelector ,selector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);

    let userView = new UserView(mainContentSelector,selector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    let postView = new PostView(mainContentSelector,selector);
    let postController = new PostController(postView, requester, baseUrl, appKey);

    let contactView = new PostView(mainContentSelector,selector);
    let contactController = new PostController(postView, requester, baseUrl, appKey);

    initEventServices();

    onRoute("#/", function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if (authService.isLoggedIn()){
            homeController.showUserPage();
        }
        else {
            homeController.showGuestPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
        let top = $('#post-' + this.params['id']).position().top;
        $(window).scrollTop(top)
    });

    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
        // Show the login page...
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn());
        // Show the register page...
    });

    onRoute("#/logout", function () {
        userController.logout();
        // Logout the current user...
    });

    onRoute('#/posts/create', function () {
        let fullName = sessionStorage.getItem('fullName');
        postController.showCreatePostPage(fullName, authService.isLoggedIn());
        // Show the new post page...
    });

    onRoute('#/contactUs', function () {
        let fullName = sessionStorage.getItem('fullName');
        contactController.showContactPage(fullName, authService.isLoggedIn());
        // Show the new post page...
    });


    bindEventHandler('login', function (ev, data) {
        userController.login(data);
        // Login the user...
    });

    bindEventHandler('register', function (ev, data) {
        userController.register(data);
        // Register a new user...
    });

    bindEventHandler('createPost', function (ev, data) {
        postController.createNewPost(data);
        // Create a new post...
    });

    run('#/');
})();
