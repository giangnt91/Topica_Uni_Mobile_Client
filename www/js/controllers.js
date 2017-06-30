angular.module('Topica.controllers', ['ionic', 'ngResource', 'ngSanitize', 'ionic.utils', 'chart.js', 'dataServices', 'ngAnimate'])
Topica.controller('TopicaCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $state, $window, ionicMaterialInk) {
    // $scope.auth = JSON.parse(localStorage.getItem('auth'));
    ionicMaterialInk.displayEffect();

    // Form data for the login modal
    $scope.logout = function () {
        $state.go('app.login', {}, { reload: true });
    }

    $scope.go_home = function () {
        $state.go('app.home', {}, { reload: true });
    }

    $scope.go_hoilanhnghe = function () {
        $state.go('app.lanhnghe', {}, { reload: true });
    }

    $scope.go_chuyennganh = function () {
        $state.go('app.chuyennganh', {}, { reload: true });
    }

    $scope.go_khoahoc = function () {
        $state.go('app.khoahoc', {}, { reload: true });
    }

    $scope.go_account = function () {
        $state.go('app.account', {}, { reload: true });
    }

    $scope.go_password = function () {
        $state.go('app.password', {}, { reload: true });
    }
})

    .controller('AccountCtrl', function ($scope, $state, $ionicPopup, $window, $rootScope, $stateParams, adService, ionicMaterialMotion, $ionicLoading, $q, ionicMaterialInk) {
        $scope.auth = JSON.parse(localStorage.getItem('auth'));
        if (!$scope.auth) {
            $state.go('app.login', {}, { reload: true });
            localStorage.clear();
        }
        //ionic.material.ink.displayEffect();
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.blinds({
            selector: '.animate-blinds .item'
        });

        // change password
        $scope.change_password = function(data){
             if (data === undefined) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Thông báo lỗi',
                    template: '<center>Vui lòng nhập Mật khẩu</center>'
                });
            } else {
                if(data.old_password !== $scope.auth[0].pass_word){
                    alertPopup = $ionicPopup.alert({
                        title: 'Thông báo lỗi',
                        template: '<center>Mật khẩu cũ không chính xác</center>'
                    });
                }
                 else {
                     $scope.old_password = true;
                     $scope.new_password = function (data_2) {
                         if (data_2 === undefined) {
                             var alertPopup = $ionicPopup.alert({
                                 title: 'Thông báo lỗi',
                                 template: '<center>Vui lòng nhập Mật khẩu mới</center>'
                             });
                         } else {
                             if (data_2.new_password !== data_2.re_password) {
                                 alertPopup = $ionicPopup.alert({
                                     title: 'Thông báo lỗi',
                                     template: '<center>Mật khẩu nhập lại không chính xác</center>'
                                 });
                             } else {
                                 adService.Change_pass($scope.auth[0].user_name, data_2.new_password).then(function(response){
                                     if (response.data.error === false) {
                                         alertPopup = $ionicPopup.alert({
                                             title: 'Thông báo',
                                             template: '<center>Mật khẩu đã được đổi thành công, đăng nhập lại để tiếp tục sử dụng</center>'
                                         });
                                         $scope.old_password = false;
                                    }else{
                                        alertPopup = $ionicPopup.alert({
                                             title: 'Thông báo',
                                             template: '<center>'+response.data.message+'</center>'
                                         });
                                    }
                                 });
                                
                             }
                         }
                     }
                 }
             }
        }

    })

    .controller('LoginCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicPopup, $window, $timeout, $rootScope, $stateParams, $ionicLoading, $q, ionicMaterialInk, adService) {
        ionicMaterialInk.displayEffect();
        $rootScope.toggledrag = false;
        $rootScope.islogin = false;
        $scope.setlogin = function () {
            $rootScope.islogin = true;
        }
        $ionicSideMenuDelegate.canDragContent(false);

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
                        $timeout(function () {
                            $window.location.reload(true);
                        });
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

    .controller('HomeCtrl', function ($scope, $stateParams, ionicMaterialInk, ionicMaterialMotion, $state, $window, $timeout, adService) {
        $scope.auth = JSON.parse(localStorage.getItem('auth'));
        if (!$scope.auth) {
            $state.go('app.login', {}, { reload: true });
            localStorage.clear();
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
        }
        
        $scope.go_chuyennganh = function () {
            $state.go('app.chuyennganh', {}, { reload: true });
        }
    })
