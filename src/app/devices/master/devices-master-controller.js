(function(){
  "use strict";

  angular
    .module('guh.devices')
    .controller('DevicesMasterController', DevicesMasterController);

  DevicesMasterController.$inject = ['$log', 'Device'];

  function DevicesMasterController($log, Device) {
    /*
     * Public variables
     */
    var vm = this;
    vm.configured = [];

    /*
     * Private methods
     */
    function _init() {
      Device.findAll().then(success, failure);

      function success(configuredDevices) {
        vm.configured = configuredDevices;
      }

      function failure(error) {
        $log.error(error);
      }
    }

    _init();

  }

}());