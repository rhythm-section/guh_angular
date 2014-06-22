var app = angular.module('app', ['ui.router', 'home', 'devices', 'rules', 'settings']);

// app.config(headers: {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
// });

// routes (with AngularUI Router)
app.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  // $httpProvider.defaults.headers.common['X-CSRF-Token']
  // var test = document.querySelector('meta[name="viewport"]').attr('content');
  // var m = document.getElementsByTagName('meta');
  // for(var i in m){
  //   console.log(m[i].content);
  // }

  // enable cross domain calls
  // $httpProvider.defaults.useXDomain = true;

  // remove the header used to identify ajax call  that would prevent CORS from working
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];


  // setting up routes with AngularJS UI router

  // for any unmatched url, send to /home
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/home.html',
      controller: 'homeController'
    })
    .state('devices', {
      url: '/devices',
      templateUrl: 'devices/list/devices-list.html',
      controller: 'devicesListController'
    })
    .state('devices.add', {
      url: '/add',
      templateUrl: 'devices/add/devices-add.html',
      controller: 'devicesAddController'
    })
    .state('devices.edit', {
      // url: '/edit',
      params: ['deviceId'],
      templateUrl: 'devices/edit/devices-edit.html',
      controller: 'devicesEditController'
    })
    .state('rules', {
      url: '/rules',
      templateUrl: 'rules/rules.html',
      controller: 'rulesController'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings/settings.html',
      controller: 'settingsController'
    })
}).run(function($rootScope, $state) {
  $rootScope.$state = $state;

  // TODO: replace this with other solution
  $rootScope.showNavigation = function() {
    var navigation = document.getElementById('main-navigation');

    FastClick.attach(document.body);

    if(navigation.className.match(/(?:^|\s)show(?!\S)/)) {
      navigation.className = navigation.className.replace(/(?:^|\s)show(?!\S)/g , '');
      navigation.className = navigation.className.replace(/(?:^|\s)animated(?!\S)/g , '');
      navigation.className = navigation.className.replace(/(?:^|\s)bounceInDown(?!\S)/g , '');
    } else {
      navigation.className += ' show';
      navigation.className += ' animated';
      navigation.className += ' bounceInDown';
    }
  }
})