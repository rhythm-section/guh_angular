// Best practices from: https://github.com/johnpapa/angularjs-styleguide#application-structure

angular
  .module('guh', [
    'ngAnimate',
    'ui.router',
    'guh.components.api',
    'guh.components.ui',
    'guh.home',
    'guh.devices'
  ]);

//   $rootScope.$state = $state;

//   // TODO: replace this with better solution (directive)
//   $rootScope.showNavigation = function() {
//     var navigation = document.getElementById('main-navigation');

//     FastClick.attach(document.body);

//     if(navigation.className.match(/(?:^|\s)show(?!\S)/)) {
//       navigation.className = navigation.className.replace(/(?:^|\s)show(?!\S)/g , '');
//     } else {
//       navigation.className += ' show';
//     }
//   };


// var app = angular.module('app', ['restangular', 'ui.router', 'app.dashboard', 'app.devices', 'app.rules', 'app.settings']);

// app.config(function(RestangularProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

//   // Configure REST-API
//   RestangularProvider.setBaseUrl('/api/v1');
//   RestangularProvider.setRequestSuffix('.json');

//   $urlRouterProvider.otherwise("/dashboard");

//   $stateProvider
//     .state('dashboard', {
//       url: '/dashboard',
//       templateUrl: 'dashboard/dashboard.html',
//       controller: 'DashboardController'
//     })

//     .state('devices', {
//       url: '/devices',
//       templateUrl: 'devices/list/devices-list.html',
//       resolve: {
//         devices: function(Device) {
//           return Device.fetchAll();
//         }
//       },
//       controller: 'DevicesListController'
//     })

//     .state('devices.add', {
//       url: '/add',
//       templateUrl: 'devices/add/devices-add.html',
//       resolve: {
//         vendors: function(Vendor) {
//           return Vendor.fetchAll();
//         }
//       },
//       controller: 'DevicesAddController',
//       controllerAs: 'guh'
//     })

//     // .state('devices.add.vendor', {
//     //   url: '/vendor',
//     //   templateUrl: 'devices/add/devices-add-vendor.html'
//     // })
    
//     // .state('devices.add.device', {
//     //   url: '/device',
//     //   templateUrl: 'devices/add/devices-add-device.html'
//     // })

//     // .state('devices.add.settings', {
//     //   url: '/settings',
//     //   templateUrl: 'devices/add/devices-add-settings.html'
//     // })

//     .state('devices.detail', {
//       url: '/:deviceId/detail',
//       // params: ['deviceId'],
//       templateUrl: 'devices/detail/devices-detail.html',
//       resolve: {
//         currentDevice: function($stateParams, Device) {
//           return Device.fetchOne($stateParams.deviceId).then();
//         },
//         currentDeviceActions: function($stateParams, Device) {
//           return Device.fetchActions($stateParams.deviceId).then(function(actions) {
//             return actions;
//           });
//           // return Action.fetchAll($stateParams.deviceId).then(function(actions) {
//           //   return actions;
//           // });
//         }
//       },
//       controller: 'DevicesDetailController'
//     })

//     .state('rules', {
//       url: '/rules',
//       templateUrl: 'rules/rules.html',
//       controller: 'RulesController'
//     })

//     .state('settings', {
//       url: '/settings',
//       templateUrl: 'settings/settings.html',
//       controller: 'SettingsController'
//     });

// }).run(function($rootScope, $state) {

//   $rootScope.$state = $state;

//   // TODO: replace this with better solution (directive)
//   $rootScope.showNavigation = function() {
//     var navigation = document.getElementById('main-navigation');

//     FastClick.attach(document.body);

//     if(navigation.className.match(/(?:^|\s)show(?!\S)/)) {
//       navigation.className = navigation.className.replace(/(?:^|\s)show(?!\S)/g , '');
//     } else {
//       navigation.className += ' show';
//     }
//   };

// });