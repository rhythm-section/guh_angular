devices.controller('DevicesDetailController', 
                  ['$scope', '$stateParams', 'currentDevice', 'currentDeviceActions',
                  function($scope, $stateParams, currentDevice, currentDeviceActions) {

  // Initialize variables
  $scope.device = currentDevice;
  $scope.deviceParams = currentDevice.params;
  $scope.deviceActions = currentDeviceActions;

  // console.log($scope.device);
  // console.log($scope.deviceParams);
  console.log($scope.deviceActions);

  // for(var i = 0; i < $scope.deviceActions.length; ++i) {
  //   params = $scope.deviceActions[i].params;
  //   console.log(params);
  // }

}]);