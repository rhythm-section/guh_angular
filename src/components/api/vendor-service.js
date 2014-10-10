var vendorService = app.factory('vendorService', ['Restangular', function(Restangular) {
  return {
    getAll: function() {
      return Restangular.all('vendors').getList();
    },
    getSupportedDevices: function(vendorId) {
      return Restangular.one('vendors', vendorId).getList('device_classes');
    }
  };
}]);