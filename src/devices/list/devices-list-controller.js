devices.controller('DevicesListController',
                  ['$scope', 'installedDevices',
                  function($scope, installedDevices) {

  $scope.installedDevices = installedDevices;

}]);