define(function(require) {
    'use strict';

    var angular = require('angular');
    var controllers = require('./controllers/controllers');
    var directives = require('./directives/directives');
    var providers = require('./providers/providers');

    var app = angular.module('Titans', [
        'ngRoute',
        'Titans.controllers',
        'Titans.directives',
        'Titans.providers'
    ]);

    app.init = function() {
        angular.bootstrap(document, ['Titans']);
    };

    return app;
});