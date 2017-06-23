angular.module('dataServices', [])
  .factory('adService', function ($http) {
    var api_gateway_url = 'http://210.211.116.79:7005';
    var parameter;
    var url;
    var header = { header: { 'Conntent-Type': 'application/x-www-form-urlencoded' } };

    return {
      Signin: function (username, password) {
        parameter = JSON.stringify({ user_name: username, pass_word: password });
        url = api_gateway_url + '/signin';
        return $http.post(url, parameter, header);
      }
    }
  })
