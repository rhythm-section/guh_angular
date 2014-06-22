devices.controller('devicesEditController', function($scope, $log, Restangular, $state, $stateParams) {
  // edit device
  $scope.editDevice = function() {
    console.log($stateParams.deviceId);
  }

  $scope.editDevice();
});