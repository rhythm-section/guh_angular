devices.controller('devicesAddController', function($scope, $log, Restangular, $state) {
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

    // add device
    Restangular.all('devices').customPOST(params).then(function(response) {
      // TODO: do something with the response (check if everything worked)
      // console.log(response);
      $scope.getInstalledDevices();
      $state.go('devices');
    });
  }
});