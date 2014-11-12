angular
  .module('guh.devices', [
    
  ])
  .config(configure);

configure.$inject = ['$stateProvider'];

function configure($stateProvider) {
  $stateProvider
    .state('guh.devices.list', {
      controller: 'DevicesListController',
      controllerAs: 'devices',
      resolve: {
        installedDevices: function(DeviceService) {
          return DeviceService.getAll();
        }
      },
      url: '/list',
      templateUrl: 'app/devices/list/devices-list.html'
    })
    .state('guh.devices.add', {
      controller: 'DevicesAddController',
      controllerAs: 'devicesAdd',
      resolve: {
        supportedVendors: function(VendorService) {
          return VendorService.getAll();
        }
      },
      url: '/add',
      templateUrl: 'app/devices/add/devices-add.html'
    })
    .state('guh.devices.detail', {
      controller: 'DevicesDetailController',
      controllerAs: 'devicesDetail',
      params: ['deviceId'],
      url: '/detail',
      templateUrl: 'app/devices/detail/devices-detail.html'
    });
}