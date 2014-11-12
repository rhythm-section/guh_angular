angular
  .module('guh.devices')
  .controller('DevicesAddController', DevicesAddController);

DevicesAddController.$inject = ['$state', '$stateParams', 'supportedVendors', 'VendorService', 'DeviceService'];

function DevicesAddController($state, $stateParams, supportedVendors, VendorService, DeviceService) {
  // Variables: General
  var vm = this;
    
  // Variables: Wizard
  vm.selectWizard = {};
  vm.wizardData = {
                    vendor: {},
                    deviceClass: {}
                  };

  // Variables: Wizard - Step 1
  vm.supportedVendors = supportedVendors;
  vm.supportedDeviceClasses = {};

  // Functions: General
  vm.isSelected = function(item) {
    if(typeof item !== undefined) {
      // TODO: Is there a better solution (directive, factory)?
      var result = false;
      
      if(vm.wizardData === undefined) {
        return false;
      } else {
        switch(item.route) {
          case 'vendors':
            result = (item.id === vm.wizardData.vendor.id) ? true : false;
            break;
          case 'device_classes':
            result = (item.id === vm.wizardData.deviceClass.id) ? true : false;
            break;
          default:
            break;
        }

        return result;
      }
    } else {
      console.log('ERROR: Selected item not set.');
    }
  };

  // Functions: Wizard - Step 1
  vm.selectVendor = function(vendor) {
    // TODO: Make copy of arrays, functions, ... (not only refference)
    if(typeof vendor !== undefined) {
      vm.wizardData.vendor.id = vendor.id;
      vm.wizardData.vendor.name = vendor.name;

      console.log(vm.wizardData);

      // Retrieve supported devices from selected vendor
      VendorService.getAllFromVendor(vm.wizardData.vendor.id).then(function(deviceClasses) {
        vm.supportedDeviceClasses = deviceClasses;
      });

      vm.selectWizard.next();
    } else {
      console.log('ERROR: Vendor not set.');
    }
  };

  // Functions: Wizard - Step 2
  vm.selectDeviceClass = function(deviceClass) {
    if(typeof deviceClass !== undefined) {
      // TODO: Make copy of arrays, functions, ... (not only refference)
      vm.wizardData.deviceClass.actionTypes = deviceClass.actionTypes;
      vm.wizardData.deviceClass.createMethods = deviceClass.createMethods;
      vm.wizardData.deviceClass.discoveryParamTypes = deviceClass.discoveryParamTypes;
      vm.wizardData.deviceClass.eventTypes = deviceClass.eventTypes;
      vm.wizardData.deviceClass.id = deviceClass.id;
      vm.wizardData.deviceClass.name = deviceClass.name;
      vm.wizardData.deviceClass.setupMethod = deviceClass.setupMethod;
      vm.wizardData.deviceClass.stateTypes = deviceClass.stateTypes;
      vm.wizardData.deviceClass.vendorId = deviceClass.vendorId;

      vm.createPairingWizard();
    } else {
      console.log('ERROR: DeviceClass not set.');
    }
  };

  // Functions: Wizard - Step 3
  // TODO: Retrieve createMethods and setupMethod constants from API
  vm.getCreateMethod = function(createMethods) {
    var i,
        size = createMethods.length,
        result = '';

    if(createMethods.constructor === Array && size === 1) {
      // If there is only one createMethod than return it
      return createMethods[0];
    } else {
      // If there are more than one createMethods, return the right createMethod according to following order (1. - highest, 3. - lowest):
      // 1. createMethodDiscovery
      // 2. createMethodUser
      // 3. createMethodAuto (return fals, because device is created automatically, no need to show user information)
      for(i = 0; i < size; i += 1) {        
        result = createMethods[i];

        if(createMethods[i] === 'CreateMethodDiscovery') {
          return result;
        } else if(createMethods[i] === 'CreateMethodUser') {
          return result;
        } else if(createMethods[i] === 'CreateMethodAuto') {
          result = 'ignore';
        } else {
          return result;
        }
      }

      // If createMethodAuto
      return result;
    }
  };

  vm.getSetupMethod = function(setupMethod) {
    // Ignore (set to '') if setupMethod === SetupMethodJustAdd
    if(setupMethod === 'SetupMethodJustAdd') {
      return 'ignore';
    } else {
      return setupMethod;
    }
  };

  vm.createPairingWizard = function() {
    var createMethod = '',
        setupMethod = '',
        pairingTemplateBasePath = 'app/devices/add/pairing-templates/';

    // Check data and get createMethod and setupMethod
    if(typeof vm.wizardData.deviceClass.createMethods !== undefined && typeof vm.wizardData.deviceClass.setupMethod !== undefined) {
      createMethod = vm.getCreateMethod(vm.wizardData.deviceClass.createMethods);
      setupMethod = vm.getSetupMethod(vm.wizardData.deviceClass.setupMethod);
    } else {
      console.log('ERROR: Either createMethods or setupMethod not set.');
    }

    // Create wizardStep for createMethod
    // TODO: Retrieve createMethods and setupMethod constants from API
    switch(createMethod) {
      case 'CreateMethodUser':
        vm.createMethodTitle = 'User';
        vm.createMethodTemplate = pairingTemplateBasePath + 'devices-add-create-user';
        break;
      case 'CreateMethodDiscovery':
        vm.createMethodTitle = 'Discovery';
        vm.createMethodTemplate = pairingTemplateBasePath + 'devices-add-create-discovery';
        break;
      default:
        break;
    }

    // Create wizardStep for setupMethod
    switch(setupMethod) {
      case 'SetupMethodDisplayPin':
        vm.setupMethodTitle = 'Display Pin';
        vm.setupMethodTemplate = pairingTemplateBasePath + 'devices-add-setup-display-pin';
        break;
      case 'SetupMethodEnterPin':
        vm.setupMethodTitle = 'Enter Pin';
        vm.setupMethodTemplate = pairingTemplateBasePath + 'devices-add-setup-enter-pin';
        break;
      case 'SetupMethodPushButton':
        vm.setupMethodTitle = 'Push Button';
        vm.setupMethodTemplate = pairingTemplateBasePath + 'devices-add-setup-push-button';
        break;
      default:
        break;
    }

    vm.selectWizard.next();
    console.log(vm);
  };

  // Functions: Wizard - Step 4
  vm.discoverDevices = function() {
    DeviceService.getDiscovered(vm.wizardData.deviceClass.id, vm.wizardData.deviceClass.discoveryParamTypes).then(function(discoveredDevices) {
      vm.discoveredDevices = discoveredDevices;
    });
  };

  vm.addDevice = function(deviceParams) {
    console.log(deviceParams);

    // Ignore restangularized elements and methods
    var deviceDescriptorId = deviceParams.originalElement.id,
        originalDeviceParams = {};

    delete deviceParams.originalElement.id;
    originalDeviceParams = deviceParams.originalElement;

    console.log(deviceDescriptorId);
    console.log(originalDeviceParams);

    // angular.forEach(deviceParams, function(value, key) {
    //   console.log(key + ' / ' + value);
      
    //   if(key === 'id') {
    //     deviceDescriptorId = value;
    //     delete deviceParams[key];
    //   } else if(key === 'route' || key === 'reqParams' || ) {
    //     delete deviceParams[key];
    //   }
    // });

    DeviceService.addOne(vm.wizardData.deviceClass.id, deviceDescriptorId, originalDeviceParams).then(function(response) {
      console.log(response);
    });

    $state.go('guh.devices.list', {}, {reload: true});
  };
}