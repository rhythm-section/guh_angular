var deviceClassService = app.factory('deviceClassService', ['Restangular', function(Restangular) {
  var DeviceClass = Restangular.all('device_classes');

  return {
    getAll: function() {
      return DeviceClass.getList();
    }
  };
}]);