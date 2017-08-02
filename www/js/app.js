// Topica UNI Mobile App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'Topica' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var Topica = angular.module('Topica', ['ionic', 'ngCordovaOauth', 'ionic-material', 'dataServices', 'ngCordova', 'ionic-datepicker'])

    .run(function ($rootScope, $ionicPlatform, $ionicHistory) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
       });
    })


    .config(function ($stateProvider, $urlRouterProvider, ionicDatePickerProvider, $ionicConfigProvider) {

        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.icon('ion-chevron-left');
        $ionicConfigProvider.backButton.text('');

        //ionic calendar
        var datePickerObj = {
            inputDate: new Date(),
            titleLabel: 'Select a Date',
            setLabel: 'Chọn',
            todayLabel: 'Today',
            closeLabel: 'Đóng',
            mondayFirst: false,
            weeksList: ["S", "M", "T", "W", "T", "F", "S"],
            monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            templateType: 'popup',
            from: new Date(1900, 1, 1),
            to: new Date(2018, 12, 1),
            showTodayButton: false,
            dateFormat: 'dd MMMM yyyy',
            closeOnSelect: false,
            disableWeekdays: []
        };
        ionicDatePickerProvider.configDatePicker(datePickerObj);

        //facebook
        // var AppId = '1781038452116644';
        // FacebookProvider.init('1781038452116644');

        $stateProvider

            //menu groups
            .state('app', {
                url: '/app',
                // abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'TopicaCtrl'
            })
            .state('app.account', {
                url: '/account',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/menu_groups/account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('app.password', {
                url: '/password',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/menu_groups/changepass.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('app.kehoachhoctap', {
                url: '/kehoachhoctap',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/menu_groups/kehoach_hoctap.html',
                        controller: 'KehoachoctapCtrl'
                    }
                }
            })
            .state('app.lovekhoahoc', {
                url: '/lovekhoahoc',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/menu_groups/khoahoc_yeuthich.html',
                        controller: 'KhoahocyeuthichCtrl'
                    }
                }
            })

            //home groups
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.lanhnghe', {
                url: '/lanhnghe',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home_groups/hoilanhnghe.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.chuyennganh', {
                url: '/chuyennganh',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home_groups/chuyennganh.html',
                        controller: 'ChuyennganhCtrl'
                    }
                }
            })
            .state('app.chuyennganhdetail', {
                url: '/chuyennganhdetail/:Id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home_groups/chuyennganhdetail.html',
                        controller: 'ChuyennganhDetailCtrl'
                    }
                }
            })
            .state('app.khoahoc', {
                url: '/khoahoc',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/menu_groups/khoahoc.html',
                        controller: 'KhoahocCtrl'
                    }
                }
            })
            .state('app.khoahocdetail', {
                url: '/khoahocdetail/:Id',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/menu_groups/khoahocdetail.html',
                        controller: 'KhoahocDetailCtrl'
                    }
                }
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('app.forgot', {
                url: '/forgot',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/forgot.html',
                        controller: 'ForgotCtrl'
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
    });
