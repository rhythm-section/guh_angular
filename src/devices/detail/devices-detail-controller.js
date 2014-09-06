devices.controller('DevicesDetailController', 
                  ['$scope', '$stateParams', 'currentDevice',
                  function($scope, $stateParams, currentDevice) {

  console.log(currentDevice);
  $scope.device = currentDevice;
  $scope.deviceParams = currentDevice.params;

}]);