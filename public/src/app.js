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
                templateUrl: '/views/list.html'
            });
            
        
        
    });
    