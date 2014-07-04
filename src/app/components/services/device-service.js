app.factory('DeviceService', ['Restangular', function(Restangular) {
  var Device = Restangular.all('devices');

  return {
    getDevices: function() {
      // $log.log(Restangular.all('devices').getList());
      // return Restangular.service('devices');
      return Device.getList();
    },
    addDevice: function(params) {
      return Device.customPOST(params);
    }
  }
}]);