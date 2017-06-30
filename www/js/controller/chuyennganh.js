Topica
    .controller('ChuyennganhCtrl', function ($scope, $stateParams, ionicMaterialInk, adService, ionicMaterialMotion, $state, $window, $timeout) {
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

        adService.Get_all_chuyenganh().then(function (response) {
             if (response.data.error === false) {
                    $scope.result = response.data.chuyennganh;
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Thông báo lỗi',
                        template: '<center>Hiện tại chưa có danh sách các chuyên ngành</center>'
                    });
                }
        })

        $scope.go_detail_chuyenganh = function (Id) {
            for (var i = 0; i < $scope.result.length; i++) {
                if (Id === $scope.result[i].Id_subject) {
                    $scope.result_detail = $scope.result[i];
                    localStorage.setItem('cn', JSON.stringify($scope.result[i]));
                }
            }
           $state.go('app.chuyennganhdetail', { 'Id': Id }, { reload: true });
        }
    })

     .controller('ChuyennganhDetailCtrl', function ($scope, $stateParams, ionicMaterialInk, $ionicPopup, ionicMaterialMotion, $state, $window, $timeout, adService) {
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
        Id_tuan = [];

        var id = $stateParams.Id;
        // var cn = JSON.parse(localStorage.getItem('cn'));
        console.log("abx")
        if (id !== undefined) {
            adService.Get_mon_by_id_cn(id).then(function (response) {
                if (response.data.error === false) {
                    $scope.monhoc = response.data.monhoc;
                    console.log($scope.monhoc)
                }
            });
        }


    })