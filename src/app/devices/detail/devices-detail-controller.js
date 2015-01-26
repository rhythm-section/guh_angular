(function(){
  "use strict";

  angular
    .module('guh.devices')
    .controller('DevicesDetailController', DevicesDetailController);

  DevicesDetailController.$inject = ['$log', '$scope', '$stateParams', '$state', '$q', 'DeviceClass', 'Device'];

  function DevicesDetailController($log, $scope, $stateParams, $state, $q, DeviceClass, Device) {

    /*
     * Public variables
     */
    var vm = this;

    /*
     * Public methods
     */

    vm.executeAction = executeAction;
    vm.remove = remove;

    /*
     * Private methods
     */
    function _init() {
      _getDevice($stateParams.id)
        .then(_getDeviceClass)
        .catch(_reportErrors);

      _getDevice($stateParams.id)
        .then(_getDeviceDetails);
    }

    function _getDevice(id) {
      return Device.find(id);
    }

    function _getDeviceClass(device) {
      return DeviceClass
        .find(device.deviceClassId)
        .then(function(deviceClass) {
          // Set deviceId for each Action

          $log.log('_getDeviceClass');
          $log.log(deviceClass);

          angular.forEach(deviceClass.actions, function(action) {
            action.setDeviceId(device.id);
          });

          vm.deviceClass = deviceClass;
          vm.deviceClassId = device.deviceClassId;
          vm.id = device.id;
          vm.name = device.name;
          vm.params = device.params;
          vm.setupComplete = device.setupComplete;
        });
    }

    function _getDeviceDetails(device) {
      return $q.all([
          Device.findActions(device),
          Device.findDeviceClass(device),
          Device.findStates(device)
        ])
        .then(function(details) {
          // TODO: Maybe consider to integrate spread-function (https://bitbucket.org/lsystems/angular-extend-promises.git OR https://github.com/ThomasBurleson/angularjs-FlightDashboard/blob/master/lib/%24QDecorator.js)
          // More info: http://stackoverflow.com/questions/16307652/promise-api-combining-results-of-2-asynchronous-call
          vm.actions = details[0];
          // vm.deviceClass = details[1];
          // vm.deviceClassId = device.deviceClassId;
          // vm.id = device.id;
          // vm.name = device.name;
          // vm.params = device.params;
          // vm.setupComplete = device.setupComplete;
          vm.states = details[2];

          $log.log(vm);
          $log.log(vm.actions);
        });
    }

    function _reportErrors(error) {
      $log.error(error);
    }

    /*
     * Public method: executeAction(action)
     */

    function executeAction(action) {
      action.execute();
    }

    /*
     * Public method: remove()
     */
    function remove() {
      Device.remove(vm.id).then(function() {
        $state.go('guh.devices.master');
      });
    }

    _init();

  }
}());