Topica
	// .directive('customFileInput', [function () {
	// 	// var auth = JSON.parse(localStorage.getItem('auth'));
	// 	return {
	// 		link: function ($scope, element, attrs) {
	// 			element.on('change', function (evt) {
	// 				var files = evt.target.files;
	// 				$scope.file = files[0];
	// 				// console.log(files[0]);
	// 				// adService.Update_avatar(auth[0].user_name, files[0]).then(function(response){
	// 				// 	console.log(response.data);
	// 				// });
	// 				// console.log(auth[0].user_name +'-'+scope.filename);
	// 			});
	// 		}
	// 	}
	// }])
	// .directive('customOnChange', function () {
	// 	return {
	// 		restrict: 'A',
	// 		link: function (scope, element, attrs) {
	// 			var onChangeFunc = scope.$eval(attrs.customOnChange);
	// 			element.bind('change', onChangeFunc);
	// 		}
	// 	};
	// })
	.directive('ngFiles', ['$parse', function ($parse) {

		function fn_link(scope, element, attrs) {
			var onChange = $parse(attrs.ngFiles);
			element.on('change', function (event) {
				onChange(scope, { $files: event.target.files });
			});
		};

		return {
			link: fn_link
		}
	}])

	.controller('AccountCtrl', function ($scope, $state, $ionicPopup, $anchorScroll, $http, $timeout, $window, $rootScope, $stateParams, adService, ionicMaterialMotion, $ionicLoading, $q, ionicMaterialInk) {
		$scope.auth = JSON.parse(localStorage.getItem('auth'));
		if (!$scope.auth) {
			$state.go('app.login', {}, {
				reload: true
			});
			localStorage.clear();
		}

		//ionic.material.ink.displayEffect();
		ionicMaterialInk.displayEffect();
		ionicMaterialMotion.blinds({
			selector: '.animate-blinds .item'
		});

		//loading
		$scope.loading = function () {
			// Setup the loader
			$ionicLoading.show({
				template: '<ion-spinner></ion-spinner> <br/> Loading',
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
		};

		//upload avatar
		var formdata = new FormData();
		$scope.getTheFiles = function ($files) {
			if ($files[0]) {
				$scope.loading();
				adService.Update_avatar($scope.auth[0].user_name, $files[0]).then(function(response){
					setTimeout(function () {
						window.location.reload(true);
						$ionicLoading.hide();
					}, 2000);
				})

			}
		};

		
		



		// change password
		$scope.change_password = function (data) {
			if (data === undefined) {
				var alertPopup = $ionicPopup.alert({
					title: 'Thông báo lỗi',
					template: '<center>Vui lòng nhập Mật khẩu</center>'
				});
			} else {
				if (data.old_password !== $scope.auth[0].pass_word) {
					alertPopup = $ionicPopup.alert({
						title: 'Thông báo lỗi',
						template: '<center>Mật khẩu cũ không chính xác</center>'
					});
				} else {
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
								$scope.loading();
								adService.Change_pass($scope.auth[0].user_name, data_2.new_password).then(function (response) {
									$timeout(function () {
										$ionicLoading.hide();
										if (response.data.error === false) {
											alertPopup = $ionicPopup.alert({
												title: 'Thông báo',
												template: '<center>Mật khẩu đã được đổi thành công, đăng nhập lại để tiếp tục sử dụng</center>'
											});
											$scope.old_password = false;
											data.old_password = '';
										} else {
											alertPopup = $ionicPopup.alert({
												title: 'Thông báo',
												template: '<center>' + response.data.message + '</center>'
											});
										}
									}, 2000);
								});

							}
						}
					}
				}
			}
		}

		//show input update profile
		$scope.update = function () {
			$scope.show_edit = true;
			$scope.loading();
			setTimeout(function () {
				$ionicLoading.hide();
			}, 1000);
		}
		$scope.cancel = function(){
			$scope.show_edit = false;
			$window.pageYOffset;
		}


		var info = [];
		$scope._info_detail = $scope.auth[0].info;
		//save
		$scope.save_profile = function (data) {
			if (data === undefined) {
				alertPopup = $ionicPopup.alert({
					title: 'Thông báo',
					template: '<center>Dữ liệu cập nhật thành công</center>'
				});
				$anchorScroll();
				$scope.show_edit = false;
			} else {
				if (data.chuc_vu === undefined || data.chuc_vu === '') {
					data.chuc_vu = $scope._info_detail[0].chuc_vu;
				}
				if (data.co_quan === undefined || data.co_quan === '') {
					data.co_quan = $scope._info_detail[0].co_quan;
				}
				if (data.dia_chi === undefined || data.dia_chi === '') {
					data.dia_chi = $scope._info_detail[0].dia_chi;
				}
				if (data.email === undefined || data.email === '') {
					data.email = $scope._info_detail[0].email;
				}
				if (data.facebook === undefined || data.facebook === '') {
					data.facebook = $scope._info_detail[0].facebook;

				}

				info.push({
					chuc_vu: data.chuc_vu,
					co_quan: data.co_quan,
					dia_chi: data.dia_chi,
					email: data.email,
					facebook: data.facebook
				});
				tmp = JSON.stringify(info);

				//send data to server
				adService.Update_profile($scope.auth[0].user_name, tmp).then(function (response) {
					console.log(response.data);
					$scope.loading();
					$timeout(function () {
						$ionicLoading.hide();
						if (response.data.profile.error === false) {
							alertPopup = $ionicPopup.alert({
								title: 'Thông báo',
								template: '<center>Thông tin đang được xử lý, đăng nhập lại để cập nhật</center>'
							});
							info = '';
						} else {
							alertPopup = $ionicPopup.alert({
								title: 'Thông báo',
								template: '<center>' + response.data.message + '</center>'
							});
						}
						$scope.show_edit = false;
					}, 2000);
				})
			}
		}

	})