var deviceService = app.factory('deviceService', ['Restangular', function(Restangular) {
  var Device = Restangular.all('devices');

  return {
    getAll: function() {
      return Device.getList();
    },
    getOne: function(deviceId) {
      deviceId = encodeURI(deviceId);
      return Device.get(deviceId);
    },
    addOne: function(params) {
      return Device.customPOST(params);
    },
    removeOne: function(device) {
      return device.remove();
    }
  };
}]);