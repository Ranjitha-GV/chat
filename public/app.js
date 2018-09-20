var routerApp = angular.module('myApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/registration');

    $stateProvider

       .state('registration', {
            url: '/registration',
            templateUrl: 'template/registration.html'
        })
        .state('success', {
            url: '/success',
            templateUrl: 'template/success.html'
        })    
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html'
        })  
        .state('homePage', {
            url: '/homePage',
            templateUrl: 'template/homePage.html'
        })    
});

