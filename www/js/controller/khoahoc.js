Topica
    .controller('KhoahocCtrl', function ($scope, $stateParams, ionicMaterialInk, ionicMaterialMotion, $state, $window, $timeout) {
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
    })