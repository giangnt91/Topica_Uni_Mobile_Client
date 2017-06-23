angular.module('Topica.controllers', ['ionic', 'ngResource', 'ngSanitize', 'ionic.utils', 'chart.js', 'dataServices'])
Topica.controller('TopicaCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $state, $window, ionicMaterialInk) {
    $scope.auth = JSON.parse(localStorage.getItem('auth'));
    ionicMaterialInk.displayEffect();

    // Form data for the login modal
    $scope.logout = function () {
        $state.go('app.login', {}, { reload: true });
        $window.location.reload(true);
    }

    $scope.go_home = function () {
        $state.go('app.home', {}, { reload: true });
        $window.location.reload(true);
    }

    $scope.go_hoilanhnghe = function () {
        $state.go('app.lanhnghe', {}, { reload: true });
        $window.location.reload(true);
    }

    $scope.go_chuyennganh = function () {
        $state.go('app.chuyennganh', {}, { reload: true });
        $window.location.reload(true);
    }

    $scope.go_khoahoc = function () {
        $state.go('app.khoahoc', {}, { reload: true });
        $window.location.reload(true);
    }
})
    .controller('LoginCtrl', function ($scope, $state, $ionicPopup, $window, $rootScope, $stateParams, $ionicLoading, $q, ionicMaterialInk, adService) {
        ionicMaterialInk.displayEffect();
        $rootScope.toggledrag = false;
        $rootScope.islogin = false;
        $scope.setlogin = function () {
            $rootScope.islogin = true;
        }

        $scope.login = function (data) {
            if (data === undefined || data.username === undefined || data.password === undefined || data.username === '' || data.password === '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Thông báo lỗi',
                    template: '<center>Vui lòng nhập Username và password</center>'
                });
            } else {
                adService.Signin(data.username, data.password).then(function (response) {
                    $scope.result = response.data;
                    if ($scope.result.error === true) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Thông báo lỗi',
                            template: '<center>Username hoặc password không chính xác</center>'
                        });
                    } else {
                        window.localStorage.setItem('auth', JSON.stringify($scope.result.profile));
                        $state.go('app.home', {}, { reload: true });
                        $window.location.reload(true);
                    }
                });
            }
        }


    })

    .controller('ForgotCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
        $scope.forgot = function () {
            alert("Yêu cầu đã được gởi đang chờ xử lý !");
            $state.go('app.login', {}, { reload: true });
        }
    })

    .controller('HomeCtrl', function ($scope, $stateParams, ionicMaterialInk, ionicMaterialMotion, $state, $window, $timeout) {
        var auth = JSON.parse(localStorage.getItem('auth'));
        if (!$scope.auth) {
            $state.go('app.login', {}, { reload: true });
            localStorage.clear();
            // $window.location.reload(true);
        }

        //ionic.material.ink.displayEffect();
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.ripple({
            selector: '.animate-ripple .item'
        });
        ionicMaterialMotion.blinds({
            selector: '.animate-blinds .item'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });

        // Toggle Code Wrapper
        var code = document.getElementsByClassName('code-wrapper');
        for (var i = 0; i < code.length; i++) {
            code[i].addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }

        $scope.go_hoilanhnghe = function () {
            $state.go('app.lanhnghe', {}, { reload: true });
            $window.location.reload(true);
        }
        $scope.go_chuyennganh = function () {
            $state.go('app.chuyennganh', {}, { reload: true });
            $window.location.reload(true);
        }

        $scope.go_detail_khoahoc = function (Id) {
            $state.go('app.khoahocdetail', { 'Id': Id }, { reload: true });
        }

        $scope.go_detail_chuyenganh = function (Id) {
            $state.go('app.chuyennganhdetail', { 'Id': Id }, { reload: true });
        }
    })
