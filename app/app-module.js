var app = angular.module('app', ['ui.router', 'app.devices']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('devices', {
      url: '/devices',
      templateUrl: 'devices/list/devices-list.html',
      controller: 'DevicesListController',
      resolve: {
        installedDevices: deviceService.getAll
      }
    }
  );

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