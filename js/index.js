//Angular.js variant of localWeather;

var app = angular.module('Weather', []);

app.factory('WeatherApi', function($http) {
  var obj = {};
  
  obj.getLoc = function() {
    return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
  };
 
  obj.getCurrent = function(city) {
    var api = "http://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=metric";
    var appid = "&APPID=e8a1a7a073e748be922b17f1199624b3" 
    var callback = "&callback=JSON_CALLBACK";
    return $http.jsonp(api + city + units + appid + callback);
  };
  
  return obj
});

app.controller('WeatherCtrl', function($scope, WeatherApi) {
  $scope.obj = {};
  $scope.obj.unit ='C';
  $scope.obj.sysChange = false;
  WeatherApi.getLoc().success(function(obj) {
    var city = obj.city + ',' + obj.country;
    $scope.obj.city = obj.city;
    $scope.obj.country = obj.country;
    WeatherApi.getCurrent(city).success(function(obj) {
      CurrentWeather(obj)
    });
  });

  function CurrentWeather(obj) {
    $scope.obj.temp = Math.round(obj.main.temp);
    $scope.obj.Cel = Math.round(obj.main.temp);
    $scope.obj.description = obj.weather[0].main;
    $scope.obj.humidity = obj.main.humidity;
    $scope.obj.Fah = Math.round(($scope.obj.temp * 9)/5 + 32 );
    return IconGen($scope.obj.description);
  }

  function IconGen(des) {    
    var ico= des.toLowerCase()
    switch (ico) {
      case 'drizzle':
        addIcon(ico)
        break;
      case 'thunderstorm':
        addIcon(ico)
        break;
      case 'clouds':
        addIcon(ico)
        break;
      case 'snow':
        addIcon(ico)
        break;
      case 'clear':
        addIcon(ico)
        break;
      case 'rain':
        addIcon(ico)
        break;
      default:
    $('div.clouds').removeClass('hide');
    }
  }

  function addIcon(ico) {
    $('div.' + ico).removeClass('hide');
  }
  
  $scope.obj.sys= function(){
   if($scope.obj.sysChange){
     $scope.obj.unit ='C';
     $scope.obj.temp = $scope.obj.Cel;
     return $scope.obj.sysChange = false;
     }
    $scope.obj.unit ='F';
    $scope.obj.temp = $scope.obj.Fah;
    return $scope.obj.sysChange = true;
  }; 
});