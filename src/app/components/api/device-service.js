angular
  .module('guh.components.api')
  .factory('DeviceService', DeviceService);

DeviceService.$inject = ['Restangular'];

function DeviceService(Restangular) {
  var Device = Restangular.all('devices'),
      service = {
        getAll: getAll,
        getOne: getOne,
        getDiscovered: getDiscovered,
        addOne: addOne
      };

  // GET Requests
  function getAll() {
    return Device.getList();
  }

  function getOne(deviceId) {
    var encodedDeviceId = encodeURI(deviceId);
    return Device.get(encodedDeviceId);
  }

  function getDiscovered(deviceClassId, discoveryParamTypes) {
    var discoveryParams = [];
    angular.forEach(discoveryParamTypes, function(discoveryParamType, index) {
      delete discoveryParamType.type;
      discoveryParams.push(discoveryParamType);
    });
    discoveryParams = angular.toJson(discoveryParams);

    return Device.customGETLIST('discover', {'device_class_id': deviceClassId, 'discovery_params': discoveryParams});
  }

  function addOne(deviceClassId, deviceDescriptorId, deviceParams) {
    console.log('addOne');
    console.log(deviceClassId);
    console.log(deviceDescriptorId);
    console.log(deviceParams);

    return Device.customPOST({
      'device': {
        'deviceClassId': deviceClassId,
        'deviceDescriptorId': deviceDescriptorId,
        'deviceParams': deviceParams
      }
    });
  }

  // POST Requests

  return service;
}