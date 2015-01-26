(function(){
  "use strict";

  angular
    .module('guh.components.api')
    .factory('vendorsService', vendorsService);

  vendorsService.$inject = ['$log', 'Restangular'];

  function vendorsService($log, Restangular) {
    var service = {
      fetchAll: fetchAll,
      fetch: fetch,
      fetchDeviceClasses: fetchDeviceClasses
    },
    api = Restangular.all('vendors');

    return service;

    // Fetch vendor list
    function fetchAll() {
      return api.getList();
    }

    // Fetch certain vendor
    function fetch(id) {
      return api.get(id);
    }

    // Fetch devicClasses of certain vendor
    function fetchDeviceClasses(vendor) {
      $log.log(vendor);
      return Restangular.one('vendors', vendor.id).getList('device_classes');
      // return vendor.getList('device_classes');
    }
  }

}());