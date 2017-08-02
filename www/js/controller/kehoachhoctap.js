Topica
    .controller('KehoachoctapCtrl', function ($scope, $stateParams, ionicMaterialInk, adService, ionicMaterialMotion, $state, $window, $timeout) {
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

        $scope.myGoBack = function () {
            $window.history.go(-1);
        };
    })