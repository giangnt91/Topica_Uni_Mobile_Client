Topica
    .controller('KhoahocyeuthichCtrl', function ($scope, $stateParams, ionicMaterialInk, $ionicPopup, ionicMaterialMotion, $state, $window, $timeout, adService) {
        $scope.auth = JSON.parse(localStorage.getItem('auth'));
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
        $scope.myGoBack = function () {
            $window.history.go(-1);
        };
        adService.Get_monhoc_yeuthich($scope.auth[0].user_name).then(function (response) {
            if(response.data.error === false){
                $scope.result = response.data.monhoc;
                console.log(response.data);
            }
        });
    })