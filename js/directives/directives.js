define(['angular', 'jQuery', 'bootstrap', 'bootstrap-select'], function(angular, services) {
    'use strict';

    /* Directives */

    angular.module('Titans.directives', [])
            .directive('bePretty', function() {

                function link(scope, element, attrs) {
                    function render()
                    {
                        jQuery(element).selectpicker();
                    }
                    //little bit overkill to DOM - just for directive presentation and module working
                    scope.$watch('onChange', function() {
                        render();
                    });
                }

                return {
                    restrict: 'A',
                    link: link
                };
            });
});