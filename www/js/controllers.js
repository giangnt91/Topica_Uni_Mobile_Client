angular.module('Topica.controllers', ['ionic', 'ionic-datepicker', 'ngCordova', 'ngFileUpload', 'angular-md5', 'ngResource', 'ngSanitize', 'ionic.utils', 'chart.js', 'dataServices', 'ngAnimate'])
	/**
	   * Just for debugging purposes.
	   * Shows objects in a pretty way
	   */
	.directive('debug', function () {
		return {
			restrict: 'E',
			scope: {
				expression: '=val'
			},
			template: '<pre>{{debug(expression)}}</pre>',
			link: function (scope) {
				// pretty-prints
				scope.debug = function (exp) {
					return angular.toJson(exp, true);
				};
			}
		}
	})

Topica.controller('TopicaCtrl', function ($scope, $ionicModal, $ionicPlatform, $ionicPopover, $timeout, $state, $window, ionicMaterialInk) {
	$scope.auth = JSON.parse(localStorage.getItem('auth'));
	ionicMaterialInk.displayEffect();

	// Form data for the login modal
	$scope.logout = function () {
		localStorage.removeItem("auth");
		$state.go('app.login', {}, {
			reload: true
		});
	}

	$scope.go_home = function () {
		$state.go('app.home', {}, {
			reload: true
		});
	}

	$scope.go_hoilanhnghe = function () {
		$state.go('app.lanhnghe', {}, {
			reload: true
		});
	}

	$scope.go_chuyennganh = function () {
		$state.go('app.chuyennganh', {}, {
			reload: true
		});
	}

	$scope.go_khoahoc = function () {
		$state.go('app.khoahoc', {}, {
			reload: true
		});
	}

	$scope.go_account = function () {
		$state.go('app.account', {}, {
			reload: true
		});
	}

	$scope.go_password = function () {
		$state.go('app.password', {}, {
			reload: true
		});
	}

	$scope.go_kehoachhoctap = function () {
		$state.go('app.kehoachhoctap', {}, {
			reload: true
		});
	}

	$scope.go_khoahoc_yeuthich = function(){
		$state.go('app.lovekhoahoc', {},{
			reload: true
		});
	}

})

	.controller('LoginCtrl', function ($scope, $state, $ionicSideMenuDelegate, $filter, ionicDatePicker, $cordovaOauth, $http, $ionicPopup, $window, $timeout, $rootScope, $stateParams, $ionicLoading, $q, ionicMaterialInk, adService) {
		$scope.auth = JSON.parse(localStorage.getItem('auth'));
		$ionicLoading.show({
			template: '<ion-spinner></ion-spinner> <br/> Loading',
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
		if ($scope.auth) {
			$timeout(function () {
				$ionicLoading.hide();
				$state.go('app.home', {}, {
					reload: true
				});
			}, 2000);
		} else {
			$ionicLoading.hide();
		}

		ionicMaterialInk.displayEffect();
		$rootScope.toggledrag = false;
		$rootScope.islogin = false;
		$scope.setlogin = function () {
			$rootScope.islogin = true;
		}
		$ionicSideMenuDelegate.canDragContent(false);
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

		$scope.sex = [
			{ Name: 'Nam', value: 1 },
			{ Name: 'Nữ', value: 0 },
		];
		$scope.info = [
			{
				"chuc_vu": "Chưa cập nhật",
				"co_quan": "Chưa cập nhật",
				"dia_chi": "Chưa cập nhật",
				"email": "Chưa cập nhật",
				"facebook": "Chưa cập nhật"
			}
		]



		//ionic datepicker
		var ipObj1 = {
			callback: function (val) {  //Mandatory
				var date = new Date();
				$scope.pickup_date = $filter('date')(val, 'dd/MM/yyyy');
			},
			inputDate: new Date(),      //Optional
			mondayFirst: true,          //Optional
			closeOnSelect: false,       //Optional
			templateType: 'popup'       //Optional
		};

		$scope.openDatePicker = function () {
			ionicDatePicker.openDatePicker(ipObj1);
		};


		$scope.login = function (data) {

			if (data === undefined || data.username === undefined || data.password === undefined || data.username === '' || data.password === '') {
				alertPopup = $ionicPopup.alert({
					title: 'Thông báo lỗi',
					template: '<center>Vui lòng nhập Username và password</center>'
				});
			} else {
				$scope.loading();
				adService.Signin(data.username, data.password).then(function (response) {
					$scope.result = response.data.profile;
					console.log($scope.result);
					if ($scope.result.error === true) {
						$timeout(function () {
							$ionicLoading.hide();
							alertPopup = $ionicPopup.alert({
								title: 'Thông báo lỗi',
								template: '<center>Username hoặc password không chính xác</center>'
							});
							data.username = '';
							data.password = '';
						}, 1000);
					} else {
						$timeout(function () {
							$ionicLoading.hide();
							window.localStorage.setItem('auth', JSON.stringify($scope.result.profile));
							$state.go('app.home', {}, {
								reload: true
							});
						}, 2000);
					}
				});
			}
		}


		//login with facebook

		/**
       * Logout
       */
		// $scope.logout = function () {
		// 	Facebook.logout(function () {
		// 		$scope.$apply(function () {
		// 			$scope.user = {};
		// 			$scope.logged = false;
		// 		});
		// 	});
		// }




		// $scope.signup_facebook = function(data) {
		//     $scope.loading();
		//     adService.Signin($scope.face_result.id, "123456").then(function(response) {
		//         $scope.result = response.data.profile;
		//         if ($scope.result.error === false) {
		//             $timeout(function() {
		//                 $ionicLoading.hide();
		//                 window.localStorage.setItem('auth', JSON.stringify($scope.result.profile));
		//                 $state.go('app.home', {}, {
		//                     reload: true
		//                 });
		//             }, 2000);
		//         } else {
		//             $scope.facebook = true;
		//             $ionicLoading.hide();

		//             if (data === undefined || $scope.pickup_date === undefined) {
		//                 alertPopup = $ionicPopup.alert({
		//                     title: 'Thông báo lỗi',
		//                     template: '<center>Vui lòng nhập đầy đủ thông tin để tiếp tục</center>'
		//                 });
		//             } else {
		//                 $scope.loading();
		//                 tmp_info = JSON.stringify($scope.info);
		//                 adService.Signup($scope.face_result.id, "123456", $scope.face_result.name, "trainghiemtopica@email.com", "Trải nghiệm", $scope.pickup_date, data.sex.value, tmp_info, 1).then(function(response) {
		//                     if (response.data.profile.error === false) {
		//                         $timeout(function() {
		//                             $ionicLoading.hide();
		//                             adService.Signin($scope.face_result.id, "123456").then(function(response) {
		//                                 $scope.result = response.data.profile;
		//                                 if ($scope.result.error === false) {
		//                                     window.localStorage.setItem('auth', JSON.stringify($scope.result.profile));
		//                                     $state.go('app.home', {}, {
		//                                         reload: true
		//                                     });
		//                                 } else {
		//                                     alertPopup = $ionicPopup.alert({
		//                                         title: 'Thông báo lỗi',
		//                                         template: '<center>Có lỗi trong quá trình xử lý vui lòng thử lại</center>'
		//                                     });
		//                                 }
		//                             });
		//                         }, 2000);
		//                     }
		//                 });
		//             }
		//         }

		//     });

		// }

		window.cordovaOauth = $cordovaOauth;
		window.http = $http;

		$scope.face_login = function login() {
			facebookLogin(window.cordovaOauth, window.http);
		}

		function facebookLogin($cordovaOauth, $http) {
			$cordovaOauth.facebook("1946240225621730", ["email", "public_profile"], { redirect_uri: "http://localhost/callback" }).then(function (result) {
				displayData($http, result.access_token);
			}, function (error) {
				alert("Error: " + error);
			});
		}

		function displayData($http, access_token) {
			$http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: access_token, fields: "name,gender,location,picture", format: "json" } }).then(function (result) {
				$scope.face_result = result.data;
				// var id = result.data.id;
				// var name = result.data.name;
				// var gender = result.data.gender;
				// var picture = result.data.picture;

				$scope.loading();
				adService.Signin($scope.face_result.id, "123456").then(function (response) {
					$scope.result = response.data.profile;
					if ($scope.result.error === false) {
						$timeout(function () {
							$ionicLoading.hide();
							window.localStorage.setItem('auth', JSON.stringify($scope.result.profile));
							$state.go('app.home', {}, {
								reload: true
							});
						}, 2000);
					} else {
						$scope.facebook = true;
						$ionicLoading.hide();
						$scope.signup_facebook = function (data) {
							if (data === undefined || $scope.pickup_date === undefined) {
								alertPopup = $ionicPopup.alert({
									title: 'Thông báo lỗi',
									template: '<center>Vui lòng nhập đầy đủ thông tin để tiếp tục</center>'
								});
							} else {
								$scope.loading();
								tmp_info = JSON.stringify($scope.info);
								adService.Signup($scope.face_result.id, "123456", $scope.face_result.name, "trainghiemtopica@email.com", "Trải nghiệm", $scope.pickup_date, data.sex.value, tmp_info, 1).then(function (response) {
									if (response.data.profile.error === false) {
										$timeout(function () {
											$ionicLoading.hide();
											adService.Signin($scope.face_result.id, "123456").then(function (response) {
												$scope.result = response.data.profile;
												if ($scope.result.error === false) {
													window.localStorage.setItem('auth', JSON.stringify($scope.result.profile));
													$state.go('app.home', {}, {
														reload: true
													});
												} else {
													alertPopup = $ionicPopup.alert({
														title: 'Thông báo lỗi',
														template: '<center>Có lỗi trong quá trình xử lý vui lòng thử lại</center>'
													});
												}
											});
										}, 2000);
									}
								});
							}
						}
					}

				});



			}, function (error) {
				alert("Error: " + error);
			});
		}



	})

	.controller('ForgotCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
		$scope.forgot = function () {
			alert("Yêu cầu đã được gởi đang chờ xử lý !");
			$state.go('app.login', {}, {
				reload: true
			});
		}
	})

	.controller('HomeCtrl', function ($scope, $stateParams, $ionicPlatform, $ionicPopup, $ionicHistory, ionicMaterialInk, ionicMaterialMotion, $state, $window, $timeout, adService) {
		$scope.auth = JSON.parse(localStorage.getItem('auth'));
		if (!$scope.auth) {
			$state.go('app.login', {}, {
				reload: true
			});
			localStorage.clear();
		}

		//Do on hard back pressed in android
		$ionicPlatform.onHardwareBackButton(function () {
			// 	confirmPopup = $ionicPopup.confirm({
			// 	title: 'Thông báo',
			// 	template: "Bạn có muốn thoát khỏi ứng dụng không ?"
			// });
			// confirmPopup.then(function (close) {
			// 	if (close) {
			// 		ionic.Platform.exitApp();
			// 	} // otherwise do nothing
			// 	console.log("User canceled exit.");
			// });
			if ($state.current.name == "app.home") {
				//Exit app
				ionic.Platform.exitApp();
			} else {
				$window.history.go(-1);
			}
		});


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
			$state.go('app.lanhnghe', {}, {
				reload: true
			});
		}

		$scope.go_chuyennganh = function () {
			$state.go('app.chuyennganh', {}, {
				reload: true
			});
		}

		$scope.go_landing_page = function(){
			// window.location.href = 'http://appmob.uni.topica.edu.vn/app-test';
			window.open('http://appmob.uni.topica.edu.vn/app-test', '_blank', 'location=yes,toolbar=yes');
		}
	})