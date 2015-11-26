define(['angular'], function (angular) {
    'use strict';


    angular.module('Titans.providers', [])
        .provider('RatingFormula', function () {
            this.$get = function () {
                return {
                    getRating: function (item) {
                        //if is selected option from list
                        if (typeof item.selectedValue != 'undefined' && item.selectedValue.name != 'empty') {
                            //school rating , 1 = best , 5 = worst
                            var maxRating = 5;
                            //hardcoded formulas , can be easily replaced to server call ( must be implemented in 1 call to prevent loading N-times for N-rows)
                            switch (item.selectedValue.name) {
                                case 'age' :
                                    var value = item.val;
                                    //formula for age rating, 18 - age = best rating , more age = less rating, 65 years - maximum scale
                                    var koeficient = 65 / maxRating;
                                    if (item.val - 17 > 0) {
                                        var rating = (item.val - 17) / koeficient;
                                    }
                                    else {
                                        rating = 5;
                                    }

                                    if (rating > maxRating)
                                        rating = maxRating;
                                    break;
                                case 'empty':
                                    rating = -1;
                                    break;
                                case 'gender' :
                                    //same rating for men/woman
                                    rating = 1;
                                    break;
                                case 'job' :
                                    switch (item.val) {
                                        case 'agro':
                                            rating = 3.88;
                                            break;
                                        case 'it' :
                                            rating = 0.5;
                                            break;
                                        default :
                                            rating = 0;
                                    }
                                case 'salary' :
                                    var value = item.val;
                                    if (value < 1650) {
                                        rating = 0.1;
                                    }
                                    if (value < 1100) {
                                        rating = 0.5;
                                    }
                                    if (value < 650) {
                                        rating = 1.5;
                                    }
                                    if (value < 400) {
                                        rating = 2.5;
                                    }
                                    if (value < 200) {
                                        rating = 5;
                                    }

                                    break;
                                default :
                                    rating = 0;
                            }
                            return (rating);
                        }
                        else {
                            return (-1);
                        }
                    }
                }
            }
        })
        .provider('Settings', function () {
            this.$get = function ($http) {
                var selectedList = new Array();
                var valuesList   = new Array();
                var options      = new Array();
                return {
                    list: function () {
                        //initialize array of select options, can be easily replaced by server call
                        options = [
                            {name: "empty", title: "Prosím vyberte možnosť..."},
                            {
                                name: "gender",
                                title: "Pohlavie",
                                type: 'select',
                                values: [{name: 'male', title: "Muž"}, {name: 'female', title: "Žena"}]
                            },
                            {name: "age", title: "Vek", type: 'input'},
                            {name: "salary", title: "Čistá mzda", type: 'input'},
                            {
                                name: "job",
                                title: "Pracovné Odvetvie",
                                type: 'select',
                                values: [{name: 'it', title: 'Informačné technológie'}, {
                                    name: 'agro',
                                    title: 'Poľnohospodárstvo'
                                }]
                            },
                            {name: 'childrens', title: 'Počet detí', type: 'input'}

                        ];
                        return (options);

                    },
                    getValueTitleByName: function (option, name) {
                        //iterate trough all options which have property "values"
                        var options = this.list();
                        var title   = '';
                        angular.forEach(options, function (value, key) {

                            if (options[key].name == option) {

                                angular.forEach(options[key].values, function (_value, _key) {

                                    if (options[key].values[_key].name == name) {

                                        title = options[key].values[_key].title;

                                    }
                                });

                            }
                        });

                        return (title);
                    },
                    getSelectedList: function () {
                        angular.forEach(selectedList, function (value, key) {
                            if (typeof valuesList[key] != 'undefined') {
                                selectedList[key]['val'] = valuesList[key]['value'];
                            }

                        });
                        return (selectedList);

                    },
                    setSelectedList: function (arr) {
                        selectedList = arr;
                    },
                    setSelect: function (index, datas) {
                        selectedList[index]['selectedValue'] = datas;
                    },
                    setValue: function (index, datas) {

                        if (typeof valuesList[index] == 'undefined') {
                            valuesList[index] = new Array();
                        }
                        valuesList[index]['value'] = datas;
                    }

                }

            }
        });
});
