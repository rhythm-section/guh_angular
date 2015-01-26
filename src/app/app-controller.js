(function(){
"use strict";

  angular
    .module('guh')
    .controller('GuhController', GuhController);

  GuhController.$inject = ['$log', '$state'];

  function GuhController($log, $state) {    
    // $log.log('GuhController');
    // $log.log($state);
  }

}());