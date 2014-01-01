define(['angular', 'app'], function(angular, app) {
    'use strict';

    return app.config(['$routeProvider', function($routeProvider, $locationProvider) {
            $routeProvider.when('/settings', {
                templateUrl: 'view/settings.html',
                controller: 'SettingsCtrl'
            });
            $routeProvider.when('/data', {
                templateUrl: 'view/data.html',
                controller: 'DataCtrl'
            });
            $routeProvider.when('/result', {
                templateUrl: 'view/result.html',
                controller: 'ResultCtrl'
            });
            $routeProvider.otherwise({redirectTo: '/settings'});
        }]);

});