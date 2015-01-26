(function(){
  "use strict";

  angular
    .module('guh.rules')
    .controller('RulesMasterController', RulesMasterController);

  RulesMasterController.$inject = ['$log', 'Rule'];

  function RulesMasterController($log, Rule) {
    /*
     * Public variables
     */
    var vm = this;
    vm.configured = [];


    /*
     * Private methods
     */
    function _init() {
      Rule.findAll().then(success, failure);

      function success(rules) {
        vm.configured = rules;
        $log.log(vm.configured);
      }

      function failure(error) {
        $log.log(error);
      }
    }

    _init();

  }

}());