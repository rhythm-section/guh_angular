angular
  .module('guh.components.api')
  .factory('VendorService', VendorService);

VendorService.$inject = ['Restangular'];

function VendorService(Restangular) {
  var Vendor = Restangular.all('vendors'),
      service = {
        getAll: getAll,
        getAllFromVendor: getAllFromVendor
      };

  // GET Requests
  function getAll() {
    return Vendor.getList();
  }

  function getAllFromVendor(vendorId) {
    return Vendor.one(vendorId).getList('device_classes');
  }

  // POST Requests

  return service;
}