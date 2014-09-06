var app = angular.module('app', ['restangular', 'ui.router', 'app.dashboard', 'app.devices', 'app.rules', 'app.settings']);

app.config(function(RestangularProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

  // Rest-API
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

  $urlRouterProvider.otherwise("/dashboard");

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardController'
    })
    .state('devices', {
      url: '/devices',
      templateUrl: 'devices/list/devices-list.html',
      resolve: {
        installedDevices: function(deviceService) {
          return deviceService.getAll();
        }
      },
      controller: 'DevicesListController'
    })
    .state('devices.detail', {
      url: '/:deviceId/detail',
      // params: ['deviceId'],
      templateUrl: 'devices/detail/devices-detail.html',
      resolve: {
        currentDevice: function($stateParams, deviceService) {
          return deviceService.getOne($stateParams.deviceId);
        }
      },
      controller: 'DevicesDetailController'
    })
    .state('rules', {
      url: '/rules',
      templateUrl: 'rules/rules.html',
      controller: 'RulesController'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings/settings.html',
      controller: 'SettingsController'
    });

}).run(function($rootScope, $state) {

  $rootScope.$state = $state;

  // TODO: replace this with better solution
  $rootScope.showNavigation = function() {
    var navigation = document.getElementById('main-navigation');

    FastClick.attach(document.body);

    if(navigation.className.match(/(?:^|\s)show(?!\S)/)) {
      navigation.className = navigation.className.replace(/(?:^|\s)show(?!\S)/g , '');
    } else {
      navigation.className += ' show';
    }
  };

});