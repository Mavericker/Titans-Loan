define(['angular'], function(angular) {
    'use strict';

    /* Controllers */

    return angular.module('Titans.controllers', ['Titans.providers'])
            .controller('SettingsCtrl', ['$scope', 'Settings', function($scope, Settings) {

                    $scope.options = Settings.list();
                    $scope._items = Settings.getSelectedList();

                    //add new setting row
                    $scope.addSettings = function()
                    {
                        var emptyRow = new Array();
                        $scope._items.push(emptyRow);
                        Settings.setSelectedList($scope._items);
                    }
                    //remove setting row 
                    $scope.removeSettings = function(item)
                    {
                        $scope._items.splice(item, 1);
                        Settings.setSelectedList($scope._items);
                    }
                    //change value of row to selected option
                    $scope.changeSettings = function(index, datas)
                    {
                        Settings.setSelect(index, datas);
                    }
                    //initialize and preselect select box
                    $scope.initSelect = function(item, def, idx)
                    {

                        if (item.selectedValue)
                        {
                            Settings.setSelect(idx, item);
                            console.log(item);
                            return(item.selectedValue);
                        }
                        else
                        {
                            Settings.setSelect(idx, def);
                            console.log(def);
                            return(null);
                        }

                    }
                }])
            .controller('DataCtrl', ['$scope', 'Settings', function($scope, Settings) {
                    $scope.options = Settings.list();
                    $scope._items = Settings.getSelectedList();
                    //change value of row
                    $scope.changeValue = function(index, datas)
                    {
                        Settings.setValue(index, datas);
                    };

                }])
            .controller('ResultCtrl', ['$scope', 'Settings', 'RatingFormula', function($scope, Settings, RatingFormula) {

                    $scope.init = function()
                    {

                        $scope.options = Settings.list();
                        $scope._items = Settings.getSelectedList();
                        var rating = 0;
                        var ratingItems = 0;
                        //get all values which are set and get rating for them
                        angular.forEach($scope._items, function(value, key) {
                            var _rating = RatingFormula.getRating($scope._items[key]);

                            if (_rating != -1)
                            {
                                rating += _rating;
                                ratingItems++;
                            }
                        });
                        //calculate average of ratings
                        rating = (rating / ratingItems);
                        $scope.rating = rating;

                        if (rating > 0 && rating < 1.5)
                        {
                            $scope.ratingClass = 'success';
                        }
                        if (rating > 1.5 && rating < 3.5)
                        {
                            $scope.ratingClass = 'warning';
                        }
                        if (rating > 3.5)
                        {
                            $scope.ratingClass = 'danger';
                        }



                    }
                    //kick off rating
                    $scope.init();

                    $scope.update = function(value)
                    {

                        var maxLoan = 20000; //maximum treshold for maximum risk
                        var monthlyLoan = value / 72; //predefined 72 months loan
                        var maxRating = 5; // worst rating
                        var koeficient = maxLoan / maxRating; //calculate koeficient for dividing

                        var realKoeficient = value / koeficient; // real value

                        $scope.options = Settings.list();
                        $scope._items = Settings.getSelectedList();
                        var rating = 0;
                        var ratingItems = 0;
                        angular.forEach($scope._items, function(value, key) {
                            var _rating = RatingFormula.getRating($scope._items[key]);

                            if (_rating != -1)
                            {
                                rating += _rating;
                                ratingItems++;
                            }
                        });

                        //calculate AVG of ratings and add koeficient from loan value
                        rating = ((rating / ratingItems) + realKoeficient);
                        if (rating > (maxRating * 2)) {
                            rating = (maxRating * 2)
                        }
                        ;
                        $scope.rating = rating;

                        if (rating > 0 && rating < 1.5)
                        {
                            $scope.ratingClass = 'success';
                        }
                        if (rating > 1.5 && rating < 6.5)
                        {
                            $scope.ratingClass = 'warning';
                        }
                        if (rating > 6.5)
                        {
                            $scope.ratingClass = 'danger';
                        }

                    }
                    //get title from option value because we store only "pretty" names of values eg: 'it' - "Informatic Technologies"
                    $scope.getValueTitleByName = function(option, name)
                    {
                        return (Settings.getValueTitleByName(option, name));
                    }
                    //update rating
                    $scope.doUpdate = function(value)
                    {
                        if (value > 0)
                        {
                            $scope.update(value);
                        }
                        else
                        {
                            $scope.init();
                        }
                    }

                }])


});