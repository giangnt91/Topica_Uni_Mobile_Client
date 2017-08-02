Topica
    .controller('KhoahocCtrl', function ($scope, $stateParams, ionicMaterialInk, $ionicPopup, ionicMaterialMotion, $state, $window, $timeout, adService) {
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
        $scope.myGoBack = function() {
                $window.history.go(-1);
            };

        //check cache
        if ($scope.result === undefined) {
            adService.Get_all_mon_hoc().then(function (response) {
                if (response.data.error === false) {
                    $scope.result = response.data.monhoc;
                    // localStorage.setItem('monhoc', $scope.result);
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Thông báo lỗi',
                        template: '<center>Hiện tại chưa có danh sách các môn học</center>'
                    });
                }
            });
        }

        $scope.go_detail_khoahoc = function (Id) {
            for (var i = 0; i < $scope.result.length; i++) {
                if (Id === $scope.result[i].Id_subject) {
                    $scope.result_detail = $scope.result[i];
                    localStorage.setItem('monhoc', JSON.stringify($scope.result[i]));
                }
            }
            $state.go('app.khoahocdetail', { 'Id': Id }, { reload: true });
            // $window.location.reload(true);
        }


    })
    .controller('KhoahocDetailCtrl', function ($scope, $stateParams, ionicMaterialInk, $ionicPopup, ionicMaterialMotion, $state, $window, $timeout, adService) {
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
        $scope.myGoBack = function() {
                $window.history.go(-1);
            };
        $scope.go_landing_page = function () {
            if ($scope.auth[0].provider === 1) {
                // window.location.href = 'http://appmob.uni.topica.edu.vn/app-test';
                window.open('http://appmob.uni.topica.edu.vn/app-test', '_blank', 'location=yes,toolbar=yes');
            }
        }

        Id_tuan = [];

        var id = $stateParams.Id;
        var monhoc = JSON.parse(localStorage.getItem('monhoc'));
        $scope.monhoc = monhoc;
        if (id !== undefined) {
            adService.Get_baihoc_by_id_monhoc(id).then(function (response) {
                if (response.data.error === false) {
                    $scope.bai_hoc = response.data.baihoc;
                    $scope.Noi_dung = $scope.bai_hoc[0].Noi_dung;
                    $scope.tuan = $scope.Noi_dung[0];
                    if (Id_tuan.length < $scope.Noi_dung.length) {
                        for (var i = 1; i <= $scope.Noi_dung.length; i++) {
                            Id_tuan.push({
                                "Id": i,
                                "text": 'Tuần ' + i
                            });
                        }
                        $scope.So_Tuan = Id_tuan;
                    }

                    // watch the filtered output formats
                    $scope.$watchCollection("So_Tuan", function (val) {
                        // select the first one when it changes
                        $scope.selected_tuan = val[0];
                    });
                }
            });

            $scope.get_detal_tuan = function (item) {
                for (var i = 0; i < $scope.Noi_dung.length; i++) {
                    if (item.Id === $scope.Noi_dung[i].Tuan) {
                        $scope.tuan = $scope.Noi_dung[i];
                    }
                }
            }
        }


    })