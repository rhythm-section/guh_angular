var devicesAddController = devices.controller('DevicesAddController',
                  ['VendorService', 'DeviceClassService', 'DeviceService', '$rootScope', '$scope', '$state', '$log', 'vendors', 'deviceClasses',
                  function(VendorService, DeviceClassService, DeviceService, $rootScope, $scope, $state, $log, vendors, deviceClasses/*, $modalInstance*/) {

  /*
   * 1. Model Functions
   */

  // set supported devices for specific vendor
  $scope.setVendorDeviceClasses = function(vendorId) {
    VendorService.getVendorDeviceClasses(vendorId).then(function(supportedDevices) {
      $scope.supportedDevices = supportedDevices;
    });
  }


  /*
   * 2. View Functions
   */

  // set vendor
  $scope.selectVendor = function(vendorId) {
    // reset params
    var container = document.getElementById('device-params');
    container.innerHTML = '';

    $scope.setVendorDeviceClasses(vendorId);
  }

  // set device
  $scope.selectDevice = function(deviceId) {
    $scope.deviceId = deviceId;

    // reset params
    var container = document.getElementById('device-params');
    container.innerHTML = '';

    $scope.supportedDevices.forEach(function(deviceClass) {
      if(deviceClass.id == deviceId) {
        deviceClass.params.forEach(function(param) {
          createParamElement(param);
        });
      }
    });
  }

  // add device
  $scope.addDevice = function() {
    var params = {};
    var inputType = '';

    $scope.supportedDevices.forEach(function(deviceClass) {
      if(deviceClass.id == $scope.deviceId) {
        params['device'] = {};
        params['device']['deviceClassId'] = deviceClass.id;
        deviceClass.params.forEach(function(param) {
          inputType = document.getElementById(param.name).getAttribute('type');

          switch(inputType) {
            case 'text':
            case 'password':
              params['device'][param.name] = document.getElementById(param.name).value;
              break;
            case 'checkbox':
              params['device'][param.name] = (document.getElementById(param.name).checked) ? true : false;
              break;
          }
        });
      }
    });

    // add device to installedDevices
    // $scope.installedDevices.customPOST(params).then(function(response) {
    DeviceService.addDevice(params).then(function(response) {
      // update device list
      $scope.setDevices();
      $state.go('devices');
    });
  }

  
  /*
   * 3. Private Functions
   */

  var createParamElement = function(param) {
    var container = document.getElementById('device-params');
    var input = null;
    var label = null;

    label = document.createElement('label');
    label.setAttribute('for', param.name);
    switch(param.name) {
      case 'mac':
        label.innerHTML = 'MAC address';
        break;
      default:
        label.innerHTML = param.name;
        break;
    }
    container.appendChild(label);

    switch(param.type) {
      case 'bool':
        input = document.createElement('input');
        input.type = 'checkbox';
        input.id = param.name;
        container.appendChild(input);
        break;
      case 'int':
        input = document.createElement('input');
        input.type = 'text';
        input.id = param.name;
        container.appendChild(input);
        break;
      case 'QString':
        input = document.createElement('input');
        switch(param.name) {
          case 'password':
            input.type = 'password';
            break;
          default:
            input.type = 'text';
            break;
        }
        input.id = param.name;
        container.appendChild(input);
        break;
    }
  }


  /*
   * 4. Initialize Controller
   */

  // set vendor and device class list
  $scope.supportedVendors = vendors;
  $scope.supportedDevices = deviceClasses;
  
}]);

devicesAddController.getVendors = function(VendorService, $q) {
  return VendorService.getVendors();
};

devicesAddController.getDeviceClasses = function(DeviceClassService, $q) {
  return DeviceClassService.getDeviceClasses();
};