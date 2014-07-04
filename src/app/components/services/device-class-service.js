app.factory('DeviceClassService', ['Restangular', function(Restangular) {
  var DeviceClass = Restangular.all('device_classes');

  return {
    getDeviceClasses: function() {
      // return Restangular.service('device_classes');
      return DeviceClass.getList();
    }
  }
}]);