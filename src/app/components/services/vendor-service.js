app.factory('VendorService', ['Restangular', function(Restangular) {
  var Vendor = Restangular.all('vendors');

  return {
    getVendors: function() {
      // return Restangular.service('vendors');
      return Vendor.getList();
    },
    getVendorDeviceClasses: function(id) {
      var DeviceClasses = Restangular.service('device_classes', Restangular.one('vendors', id));
      return DeviceClasses.getList();
    }
  }
}]);