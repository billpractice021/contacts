angular.module('ContactsApp', ['ngRoute', 'ui.router', 'ngResource']) 
    .config(function ($stateProvider, $routeProvider, $locationProvider) {
        // $routeProvider
        //     .when('/contacts', {
        //         controller: 'ListController',
        //         templateUrl: '/views/list.html'
        //     });
        $stateProvider
            .state('contacts', {
                url: '/contacts',
                controller: 'ListController as list',
                templateUrl: '/views/list.html'
            })
            .state('/contact/new', {
                url: '/contact/new',
                controller: 'NewController as new', 
                templateUrl: 'views/new.html'
            });
            
        
        
    });
    