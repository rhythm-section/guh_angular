(function(){
"use strict";

  angular
    .module('guh.components.ui')
    .directive('guhHeader', headerDirective);

  headerDirective.$inject = ['$log'];

  function headerDirective($log) {

    var directive = {
      controller: headerController,
      controllerAs: 'headerController',
      restrict: 'A',
      scope: true,
      templateUrl: 'components/directives/header/header.html'
    };

    headerController.$inject = ['$rootScope', '$state'];

    function headerController($rootScope, $state) {
      // If rootstate (/widgets, /devices, /rules): Clear history
      // Else: add current state + state params to history

      var vm = this;
      vm.firstButton = {
        name: '',
        state: ''
      };
      vm.secondButton = {
        name: '',
        state: ''
      };
      vm.go = go;

      function _init() {
        $log.log('State:', $state.current.name);

        switch($state.current.name) {
          case 'guh.devices.master':
            vm.secondButton.name = 'add';
            vm.secondButton.state = 'guh.devices.add';
            break;
          case 'guh.devices.details':
            vm.firstButton.name = 'guh.devices.master';
            vm.firstButton.state = 'guh.devices.master';
            vm.secondButton.name = 'guh.devices.edit';
            vm.secondButton.state = 'guh.devices.edit';
            break;
          case 'guh.rules.master':
            break;
          case 'guh.rules.details':
            break;
        }
      }

      function go(state) {
        $state.go(state);
      }

      // $scope.$on('$stateChangeSuccess', function (event, toState, toStateParams, fromState, fromStateParams) {
      //   $log.log(event);
      //   $log.log(toState);
      //   $log.log(toStateParams);
      //   $log.log(fromState);
      //   $log.log(fromStateParams);
      // });

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $log.log('stateChangeStart');
        _init();
      })
      
    }

    return directive;

  }

}());