// Topica UNI Mobile App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'Topica' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var Topica = angular.module('Topica', ['ionic', 'ionic-material','dataServices','ngCordova'])

.run(function ($ionicPlatform) {
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

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        // abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'TopicaCtrl'
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
                controller: 'HomeCtrl'
            }
        }
    })
    .state('app.chuyennganhdetail', {
        url: '/chuyennganhdetail/:Id',
        views: {
            'menuContent': {
                templateUrl: 'templates/home_groups/chuyennganhdetail.html',
                controller: 'ChuyennganhCtrl'
            }
        }
    })
    .state('app.khoahoc', {
        url: '/khoahoc',
        views: {
            'menuContent': {
                templateUrl: 'templates/menu_groups/khoahoc.html',
                controller: 'HomeCtrl'
            }
        }
    })
    .state('app.khoahocdetail', {
        url: '/khoahocdetail/:Id',
        views: {
            'menuContent': {
                templateUrl: 'templates/menu_groups/khoahocdetail.html',
                controller: 'KhoahocCtrl'
            }
        }
    })
    
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent':{
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }    
    })
    
    .state('app.forgot', {
        url: '/forgot',
        views: {
            'menuContent':{
                templateUrl: 'templates/forgot.html',
                controller: 'ForgotCtrl'
            }
        }    
    })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
