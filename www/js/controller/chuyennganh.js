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

        $scope.myGoBack = function () {
            $window.history.go(-1);
        };

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
       $scope.auth = JSON.parse(localStorage.getItem('auth'));
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

        Id_tuan = [];

        var id = $stateParams.Id;
        // var cn = JSON.parse(localStorage.getItem('cn'));
        if (id !== undefined) {
            adService.Get_mon_by_id_cn(id).then(function (response) {
                if (response.data.error === false) {
                    $scope.monhoc = response.data.monhoc;
                }
            });
        }

        // create monhoc yeu thich
        $scope.yeuthich = function(id){
            adService.Get_monhoc_detail(id).then(function(response){
                $scope.result = response.data.monhoc;
                if(response.data.error === false){
                    adService.Create_monhoc_yeuthich($scope.auth[0].user_name, $scope.result[0].Id_subject, $scope.result[0].Name, $scope.result[0].Image_url, $scope.result[0].Id_class, $scope.result[0].From_day, $scope.result[0].To_day, $scope.result[0].Manager, $scope.result[0].Teacher, $scope.result[0].Status).then(function (response) {
                        if (response.data.error === false) {
                            adService.Get_monhoc_yeuthich().then(function(response){
                                console.log(response.data);
                            });
                            var alertPopup = $ionicPopup.alert({
                                title: 'Thông báo',
                                template: '<center>Đã thêm vào khóa học yêu thích</center>'
                            });
                        }
                    })
                }
            });
        }


    })