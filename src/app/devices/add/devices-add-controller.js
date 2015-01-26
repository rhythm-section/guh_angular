(function(){
"use strict";

  angular
    .module('guh.devices')
    .controller('DevicesAddController', DevicesAddController);

  DevicesAddController.$inject = ['$log', '$state', 'Vendor', 'Device', 'ParamDescriptor'];

  function DevicesAddController($log, $state, Vendor, Device, ParamDescriptor) {
    // Private Variables
    // var wizardData = {
    //   vendor       : {},
    //   deviceClass  : {},
    //   createMethod : '',
    //   setupMethod  : '',
    //   params       : {}
    // };

    // Public Variables
    var vm = this;
    vm.supportedVendors = [];
    vm.supportedDeviceClasses = [];
    vm.currentDeviceClass = {};
    vm.discoveredDevices = [];

    // Public Methods
    vm.selectVendor = selectVendor;
    vm.selectDeviceClass = selectDeviceClass;
    vm.discoverDevices = discoverDevices;
    vm.save = save;
    // vm.setDeviceParams = setDeviceParams;

    // Initialize Controller
    _init();

    /*
     * Private method: _init()
     */
    function _init() {
      _loadVendors();
    }

    /*
     * Private method: _loadVendors()
     */
    function _loadVendors() {
      Vendor
        .findAll()
        .then(function(vendors) {
          vm.supportedVendors = vendors;
        });
    }

    /*
     * Private method: _loadVendorDeviceClasses(vendor)
     */
    function _loadVendorDeviceClasses(vendor) {
      Vendor
        .findDeviceClasses(vendor)
        .then(function(deviceClasses) {
          vm.supportedDeviceClasses = deviceClasses;
        });
    }

    /*
     * Public method: discoverDevices()
     */
    function discoverDevices() {
      // var discoveryParamDescriptors = [];
      // angular.forEach(vm.currentDeviceClass.discoveryParamTypes, function(paramTypeData, index) {
      //   // vm.currentDeviceClass.discoveryParamTypes[index] = new ParamDescriptor(paramTypeData);
      //   var discoveryParamDescriptor = new ParamDescriptor(paramTypeData);
      //   discoveryParamDescriptors.push(discoveryParamDescriptor);
      // });

      // $log.log(discoveryParamDescriptors);

      Device
        .discover(vm.currentDeviceClass)
        .then(function(discoveredDevices) {
          vm.discoveredDevices = discoveredDevices;
        });

      // deviceManager
      //   .listDiscovered(vm.currentDeviceClass.id, vm.currentDeviceClass.discoveryParamTypes)
      //   .then(function(discoveredDevices) {
      //     vm.discoveredDevices = discoveredDevices;
      //   });
    }

    /*
     * Public method: selectVendor()
     */
    function selectVendor(vendor) {
      _loadVendorDeviceClasses(vendor);
    }

    /*
     * Public method: selectDeviceClass()
     */
    function selectDeviceClass(deviceClass) {
      $log.log(deviceClass);
      // vm.currentDeviceClass = angular.copy(deviceClass);
      vm.currentDeviceClass = deviceClass;
      vm.createMethod = deviceClass.getCreateMethod();
      vm.setupMethod = deviceClass.getSetupMethod();
    }

    /*
     * Public method: save()
     */
    function save(device) {
      if(angular.isObject(device)) {
        vm.currentDeviceClass.descriptorId = device.id;
        Device.add(vm.currentDeviceClass);
      } else {
        Device.add(vm.currentDeviceClass);
      }

      $state.go('guh.devices.master');
    }

  }
}());