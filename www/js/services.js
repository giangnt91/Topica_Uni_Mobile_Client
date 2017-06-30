angular.module('dataServices', [])
  .factory('adService', function ($http) {
    var api_gateway_url = 'http://210.211.116.79:7006';
    // var api_gateway_url = 'http://localhost:7006';
    var parameter;
    var url;
    var header = { header: { 'Conntent-Type': 'application/x-www-form-urlencoded' } };

    return {
      Signin: function (username, password) {
        parameter = JSON.stringify({ user_name: username, pass_word: password });
        url = api_gateway_url + '/signin';
        return $http.post(url, parameter, header);
      },
      Change_pass: function (user_name, pass_word) {
        parameter = JSON.stringify({ user_name: user_name, pass_word: pass_word });
        url = api_gateway_url + '/changepass';
        return $http.post(url, parameter, header);
      },
      Get_all_mon_hoc: function () {
        url = api_gateway_url + '/monhocs';
        return $http.get(url, parameter, header);
      },
      Get_baihoc_by_id_monhoc: function (id) {
        parameter = JSON.stringify({ Id_subject: id });
        url = api_gateway_url + '/baihocs';
        return $http.post(url, parameter, header);
      },
      Get_all_chuyenganh: function () {
        url = api_gateway_url + '/chuyennganh';
        return $http.post(url, parameter, header);
      },
      Get_mon_by_id_cn: function(id){
        parameter = JSON.stringify({Id_nganh: id});
        url = api_gateway_url + '/monhocbyidcn';
        return $http.post(url, parameter, header);
      }
    }
  })
