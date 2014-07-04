var devicesListController = devices.controller('DevicesListController',
                  ['VendorService', 'DeviceClassService', 'DeviceService', '$scope', '$log', 'installedDevices',
                  function(VendorService, DeviceClassService, DeviceService, $scope, $log, installedDevices) {

  // initialize $scope variables
  $scope.installedDevices = installedDevices;

  /*
   * 1. Model Functions
   */

  // set installed devices
  $scope.setDevices = function() {
    DeviceService.getDevices().then(function(devices) {
      $scope.installedDevices = devices;
    });
  }

  // filters
  $scope.filters = {
    vendorName: '',
    deviceName: ''
  };

  // delete device
  $scope.deleteDevice = function(device) {
    device.remove().then(function(response) {
      // TODO: do something with the response (check if everything worked)

      $scope.installedDevices = _.without($scope.installedDevices, device);
    });
  }

  // edit device
  $scope.editDevice = function(deviceId) {
    console.log('TODO: edit device');
  }

}]);

devicesListController.getDevices = function(DeviceService, $q) {
  // var data = $q.defer();

  // DeviceService.getDevices().then(function(devices) {
  //   data.resolve({
  //     devices: function() {
  //       return devices;
  //     }
  //   });
  // });

  // return data.promise;

  return DeviceService.getDevices();

  // return {
  //   devices: DeviceService.getDevices()
  // }
};