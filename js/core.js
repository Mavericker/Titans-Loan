require.config({
    paths: {
        'angular': '../lib/angular/angular',
        'ngRoute': '../lib/angular-route/angular-route',
        'jQuery': '../lib/jquery/jquery',
        'bootstrap': '../lib/bootstrap/bootstrap',
        'bootstrap-select': '../lib/bootstrap-select/bootstrap-select'
    },
    shim: {
        ngRoute: {
            deps: ['angular'],
            exports: 'ngRoute'
        },
        bootstrap: {
            deps: ['jQuery'],
            exports: 'bootstrap'
        },
        angular: {
            exports: 'angular'
        },
        'bootstrap-select': {
            deps : ['bootstrap','jQuery'],
            exports: 'bootstrap-select'
        }
    },
    baseUrl: '/js'
});

require(['app', 'routes', 'ngRoute', 'jQuery', 'bootstrap-select', 'bootstrap'], function(app) {
    app.init();
});