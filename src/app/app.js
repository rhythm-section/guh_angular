// TODO: Replace $log with logging provider (everywhere)
//       Example 1: http://www.webdeveasy.com/service-providers-in-angularjs-and-logger-implementation/
//       Example 2: http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/

(function(){
"use strict";

  angular
    .module('guh', [
      // Angular dependencies
      'ngMessages',

      // Other dependencies
      'ui.router',

      // Components
      'guh.components.api',
      'guh.components.models',
      'guh.components.ui',

      // App
      'guh.devices',
      'guh.rules'
    ])
    .config(config);

  config.$inject = ['$urlRouterProvider', '$stateProvider'];

  function config($urlRouterProvider, $stateProvider) {
    $urlRouterProvider
      .when('/devices', '/devices/all')
      .when('/devices/detail', '/devices/all')
      .when('/rules', '/rules/all')
      .when('/rules/detail', '/rules/all')
      .otherwise('/dashboard');

    $stateProvider
      .state('guh', {
        abstract: true,
        views: {
          'app': {
            controller: 'GuhController',
            controllerAs: 'guh',
            templateUrl: 'app/app.html'
          },
          'navigation@guh': {
            templateUrl: 'app/component-templates/navigation.html'
          },
          'header@guh': {
            templateUrl: 'app/component-templates/header.html'
          }
        }
      })
      .state('guh.dashboard', {
        url: '/dashboard',
        // views: {
        //   'navigation@guh': {
        //     templateUrl: 'app/templates/navigation.html'
        //   },
        //   'header@guh': {
        //     templateUrl: 'app/templates/header.html'
        //   }
        // }
      })
      .state('guh.devices', {
        abstract: true,
        template: '<ui-view/>',
        url: '/devices'
      })
      .state('guh.devices.master', {
        url: '/all',
        views: {
          'main@guh': {
            controller: 'DevicesMasterController',
            controllerAs: 'devices',
            templateUrl: 'app/devices/master/devices-master.html'
          },
          'navigation@guh': {
            templateUrl: 'app/devices/master/component-templates/navigation.html'
          },
          'header@guh': {
            templateUrl: 'app/devices/master/component-templates/header.html'
          }
        }
      })
      .state('guh.devices.detail', {
        // url: '/:id/',
        url: '/detail',
        params: { id: {} },
        views: {
          'main@guh': {
            controller: 'DevicesDetailController',
            controllerAs: 'device',
            templateUrl: 'app/devices/detail/devices-detail.html'
          },
          'navigation@guh': {
            templateUrl: 'app/devices/detail/component-templates/navigation.html'
          },
          'header@guh': {
            templateUrl: 'app/devices/detail/component-templates/header.html'
          }
        }
      })
      .state('guh.devices.add', {
        url: '/add',
        views: {
          'main@guh': {
            controller: 'DevicesAddController',
            controllerAs: 'addDevice',
            templateUrl: 'app/devices/add/devices-add.html'
          },
          'navigation@guh': {
            templateUrl: 'app/devices/add/component-templates/navigation.html'
          },
          'header@guh': {
            templateUrl: 'app/devices/add/component-templates/header.html'
          }
        }
      })
      .state('guh.rules', {
        abstract: true,
        template: '<ui-view/>',
        url: '/rules'
      })
      .state('guh.rules.master', {
        url: '/all',
        views: {
          'main@guh': {
            controller: 'RulesMasterController',
            controllerAs: 'rules',
            templateUrl: 'app/rules/master/rules-master.html'
          },
          'navigation@guh': {
            templateUrl: 'app/rules/master/component-templates/navigation.html'
          },
          'header@guh': {
            templateUrl: 'app/rules/master/component-templates/header.html'
          }
        }
      })
      .state('guh.rules.detail', {
        // url: '/:id/',
        url: '/detail',
        params: { id: {} },
        views: {
          'main@guh': {
            controller: 'RulesDetailController',
            controllerAs: 'rule',
            templateUrl: 'app/rules/detail/rules-detail.html'
          },
          'navigation@guh': {
            templateUrl: 'app/rules/detail/component-templates/navigation.html'
          },
          'header@guh': {
            templateUrl: 'app/rules/detail/component-templates/header.html'
          }
        }
      })
      .state('guh.rules.add', {
        url: '/add',
        views: {
          'main@guh': {
            controller: 'RulesAddController',
            controllerAs: 'addRule',
            templateUrl: 'app/rules/add/rules-add.html'
          },
          'navigation@guh': {
            templateUrl: 'app/rules/add/component-templates/navigation.html'
          },
          'header@guh': {
            templateUrl: 'app/rules/add/component-templates/header.html'
          }
        }
      });
  }

}());