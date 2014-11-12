angular
  .module('guh')
  .controller('GuhController', GuhController);

GuhController.$inject = [];

function GuhController() {
  var vm = this;

  var init = function() {
    vm.navigationAdd = false;
    vm.navigationRooms = false;
  };

  init();
}