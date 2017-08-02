angular.module('dataServices', [])
  .factory('adService', function ($http, $q) {
    // var api_gateway_url = 'http://210.211.116.79:7006';
    var api_gateway_url = 'http://localhost:7006';
    var parameter;
    var url;
    var header = { header: { 'Conntent-Type': 'application/x-www-form-urlencoded' } };

    return {
      Signin: function (username, password) {
        parameter = JSON.stringify({ user_name: username, pass_word: password });
        url = api_gateway_url + '/signin';
        return $http.post(url, parameter, header);
      },
      Signup: function (_username, _password, _fullname, _studyemail, _class, _birthday, _sex, _info, _provide) {
        parameter = JSON.stringify({ user_name: _username, pass_word: _password, full_name: _fullname, study_email: _studyemail, class: _class, birthday: _birthday, sex: _sex, info: _info, provider: _provide });
        url = api_gateway_url + '/signup';
        return $http.post(url, parameter, header);
      },
      Change_pass: function (user_name, pass_word) {
        parameter = JSON.stringify({ user_name: user_name, pass_word: pass_word });
        url = api_gateway_url + '/changepass';
        return $http.post(url, parameter, header);
      },
      Update_profile: function (user_name, info) {
        parameter = JSON.stringify({ user_name: user_name, info: info });
        url = api_gateway_url + '/profile';
        return $http.post(url, parameter, header);
      },
      Update_avatar: function (user_name, file) {
            var fd = new FormData();
          
           fd.append('auth', user_name);
           fd.append('avatar', file);

          return $http.post(api_gateway_url + '/avatar', fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })

           .success(function(){
           })

           .error(function(){
           });
      },
      Get_all_mon_hoc: function () {
        url = api_gateway_url + '/monhocs';
        return $http.get(url, parameter, header);
      },
      Get_monhoc_detail: function (_id) {
        parameter = JSON.stringify({ Id_subject: _id });
        url = api_gateway_url + '/mohocdetail';
        return $http.post(url, parameter, header);
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
      Get_mon_by_id_cn: function (id) {
        parameter = JSON.stringify({ Id_nganh: id });
        url = api_gateway_url + '/monhocbyidcn';
        return $http.post(url, parameter, header);
      },
      Create_monhoc_yeuthich: function (_auth, _id_subject, _name, _image_url, _id_class, _from_day, _to_day, _manager, _teacher, _status) {
        parameter = JSON.stringify({ Auth: _auth, Id_subject: _id_subject, Name: _name, Image_url: _image_url, Id_class: _id_class, From_day: _from_day, To_day: _to_day, Manager: _manager, Teacher: _teacher, Status: _status });
        url = api_gateway_url + '/cyeuthich';
        return $http.post(url, parameter, header);
      },
      Get_monhoc_yeuthich: function (auth) {
        parameter = JSON.stringify({ Auth: auth });
        url = api_gateway_url + '/yeuthich';
        return $http.post(url, parameter, header);
      }
    }
  })
