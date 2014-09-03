var app = angular.module('app', ['ui.router', 'app.dashboard', 'app.devices', 'app.rules', 'app.settings']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

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
      controller: 'DevicesListController'
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