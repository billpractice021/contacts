angular.module('ContactsApp', ['ngRoute', 'ui.router', 'ngResource', 'ngMessages']) 
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
            })
            .state('/contact/:id', {
                url: '/contact/:id',
                controller: 'SingleController as single',
                templateUrl: 'views/single.html'
            })
            .state('/settings', {
                url: '/settings',
                controller: 'SettingsController as settings',
                templateUrl: 'views/settings.html'
            })
            $routeProvider.otherwise({
                redirectTo: '/contacts'   
            });
        })
        .value('options', {})
        .run(function (options, Fields) {
            Fields.get().success(function (data) {
                options.displayed_fields = data;
            });
        });
