angular
  .module('guh.devices')
  .controller('DevicesDetailController', DevicesDetailController);

DevicesDetailController.$inject = ['$state', '$stateParams'];

function DevicesDetailController($state, $stateParams) {

  console.log($state);
  console.log($stateParams);
  // vm.deviceId = $

}