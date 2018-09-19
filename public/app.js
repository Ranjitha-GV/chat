var scotchApp = angular.module('myApp', ['ngRoute']);

scotchApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
            templateUrl : 'template/registration.html'
        })

        // route for the about page
        .when('/success', {
            templateUrl : 'template/success.html'
        })
    });