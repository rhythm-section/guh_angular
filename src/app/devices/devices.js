var devices = angular.module('devices', ['restangular']);

devices.config(function(RestangularProvider) {
  // Setting up communication to REST-API with restangular
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
});