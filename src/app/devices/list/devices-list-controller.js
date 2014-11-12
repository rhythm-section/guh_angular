angular
  .module('guh.devices')
  .controller('DevicesListController', DevicesListController);

DevicesListController.$inject = ['installedDevices'];

function DevicesListController(installedDevices) {
  var vm = this;

  vm.installedDevices = installedDevices;
}