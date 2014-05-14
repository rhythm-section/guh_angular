devices.controller('devicesListController', function($rootScope, $scope, $log, Restangular, $state) {
  // filters
  $scope.filters = {
    vendorName: '',
    deviceName: ''
  };

  // get installed devices
  $scope.getInstalledDevices = function() {
    Restangular.all('devices').getList().then(function(installedDevices) {
      // TODO: add vendor to device list
      // installedDevices.forEach(function(installedDevice) {
      //   installedDevice.vendor = "Vendorname";
      // });
      $scope.installedDevices = installedDevices;
    });
  }

  // get supported vendors (all)
  Restangular.all('vendors').getList().then(function(supportedVendors) {
    $scope.supportedVendors = supportedVendors;
  });

  // get supported devices (all)
  Restangular.all('device_classes').getList().then(function(supportedDevices) {
    $scope.supportedDevices = supportedDevices;
  });

  // set vendor
  $scope.setVendor = function(vendorId) {
    // reset params
    var container = document.getElementById('device-params');
    container.innerHTML = '';

    Restangular.one('vendors', vendorId).getList('device_classes').then(function(supportedDevices) {
      $scope.supportedDevices = supportedDevices;
    });
  }

  // set device
  $scope.setDevice = function(deviceId) {
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

  $scope.deleteDevice = function(deviceId) {
    Restangular.one('devices', deviceId).remove().then(function(response) {
      // TODO: do something with the response (check if everything worked)
      // console.log(response);

      $scope.getInstalledDevices();
    });
  }

  $scope.editDevice = function(deviceId) {
    console.log('TODO: edit device');
  }

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

  // Init
  $scope.getInstalledDevices();
});