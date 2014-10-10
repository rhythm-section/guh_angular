devices.controller('DevicesAddController',
                  ['$scope', '$state', 'vendorService', 'deviceService', 'supportedVendors',
                  function($scope, $state, vendorService, deviceService, supportedVendors) {
  
  $scope.supportedVendors = supportedVendors;
  $scope.supportedDevices = [];
  $scope.selectedVendor = {};
  $scope.selectedDevice = {};
  $scope.createMethod = '';
  $scope.setupMethod = '';
  // $scope.wizardData = {};

  $scope.selectVendor = function(vendor) {
    console.log('selectVendor');
    $scope.selectedVendor = vendor;
    vendorService.getSupportedDevices(vendor.id).then(function(supportedDevices) {
      $scope.supportedDevices = supportedDevices;
    });
  };

  $scope.selectDevice = function(device) {
    console.log('selectedDevice');
    $scope.selectedDevice = device;
    $scope.createMethod = $scope.selectedDevice.createMethod;
    $scope.setupMethod = $scope.selectedDevice.setupMethod;
    console.log($scope.createMethod);
    console.log($scope.setupMethod);
  };

  $scope.isSelectedVendor = function(vendor) {
    return ($scope.selectedVendor === vendor) ? true : false;
  };

  $scope.isSelectedDevice = function(device) {
    return ($scope.selectedDevice === device) ? true : false;
  };

  // $scope.selectVendor = function(vendor) {
  //   vendorService.getSupportedDevices(vendor.id).then(function(supportedDevices) {
  //     $scope.guh.supportedDevices = supportedDevices;
  //   });

  //   // call next function of wizard
  //   // $scope.guh.deviceAdder.next();

  //   // $scope.wizardData.vendor = vendor;                  // TODO: replace with generic wizard
  //   // vendorService.getSupportedDevices(vendor.id).then(function(supportedDevices) {
  //   //   $scope.supportedDevices = supportedDevices;
  //   // });

  //   // $state.go('devices.add.device');                    // TODO: replace with generic wizard
  // };

  // $scope.selectDevice = function(device) {
  //   // $scope.wizardData.device = device;                  // TODO: replace with generic wizard
  //   // $scope.wizardData.params = device.params;           // TODO: replace with generic wizard
    
  //   console.log(device);

  //   // $scope.wizardData.params = [];

  //   // device.params.forEach(function(param) {
  //   //   $scope.wizardData.params.push(param);
  //   // });

  //   if($scope.wizardData.device.createMethod == 'CreateMethodDiscovery') {
  //     console.log($scope.wizardData.device.createMethod);
  //     // Search for WEMO Switch
  //   }

  //   if($scope.wizardData.device.setupMethod == 'SetupMethodJustAdd') {
  //     console.log($scope.wizardData.device.setupMethod);
  //   }

  //   $scope.createParamElements();

  //   // $state.go('devices.add.settings');                  // TODO: replace with generic wizard
  // };

  $scope.addDevice = function(deviceData) {
    console.log('add device');
  
    var postData = {};
    postData.device = {};
    postData.device.deviceClassId = $scope.selectedDevice.id;
    postData.device.deviceParams = deviceData;

    console.log(postData);
    deviceService.addOne(postData);

    // var postData = {};
    // var inputType = '';

    // postData.device = {};
    // postData.device.deviceClassId = $scope.wizardData.device.id;
    // postData.device.deviceParams = [];

    // $scope.wizardData.params.forEach(function(param) {
    //   inputType = document.getElementById(param.name).getAttribute('type');
    //   // console.log(inputType + ' / ' + param.type);

    //   switch(inputType) {
    //     case 'text':
    //     case 'password':
    //       delete param.type;
    //       param.value = document.getElementById(param.name).value;
    //       postData.device.deviceParams.push(param);
    //       break;
    //     case 'checkbox':
    //       delete param.type;
    //       param.value = (document.getElementById(param.name).checked) ? true : false;
    //       postData.device.deviceParams.push(param);
    //       break;
    //   }
    // });

    // deviceService.addOne(postData);

    $state.go('devices', {}, {reload: true});
  };

  // $scope.createParamElements = function() {
  //   var container = document.getElementById('device-params');

  //   if($scope.wizardData.params) {
  //     $scope.wizardData.params.forEach(function(param) {
  //       var input = null;
  //       var label = null;

  //       label = document.createElement('label');
  //       label.setAttribute('for', param.name);
  //       switch(param.name) {
  //         case 'mac':
  //           label.innerHTML = 'MAC address';
  //           break;
  //         default:
  //           label.innerHTML = param.name;
  //           break;
  //       }

  //       switch(param.type) {
  //         case 'bool':
  //           input = document.createElement('input');
  //           input.type = 'checkbox';
  //           input.id = param.name;
  //           container.appendChild(input);
  //           container.appendChild(label);
  //           break;
  //         case 'int':
  //           input = document.createElement('input');
  //           input.type = 'text';
  //           input.id = param.name;
  //           container.appendChild(label);
  //           container.appendChild(input);
  //           break;
  //         case 'QString':
  //           input = document.createElement('input');
  //           switch(param.name) {
  //             case 'password':
  //               input.type = 'password';
  //               break;
  //             default:
  //               input.type = 'text';
  //               break;
  //           }
  //           input.id = param.name;
  //           container.appendChild(label);
  //           container.appendChild(input);
  //           break;
  //       }
  //     });
  //   }
  // };

}]);