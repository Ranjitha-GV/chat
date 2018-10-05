var chatApp = angular.module('myApp', ['ui.router','btford.socket-io']);

chatApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/registration');

    $stateProvider

       .state('registration', {
            url: '/registration',
            templateUrl: 'template/registration.html',
            controller: 'registerCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html',
            controller: 'loginCtrl'
        })  
        .state('homePage', {
            url: '/homePage',
            templateUrl: 'template/homePage.html',
            controller: 'homecontroller'
        })   
        .state('home2', {
            url: '/home2',
            templateUrl: 'template/home2.html',
            controller: 'singleChatCntrl'
        })
       
});


chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4000')
    });
}]);
