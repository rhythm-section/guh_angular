var rules = angular.module('rules', ['restangular']);

rules.config( function(RestangularProvider) {
  // Setting up communication with REST-API with restangular
  RestangularProvider.setBaseUrl('http://localhost:30000/api/v1');
  RestangularProvider.setRequestSuffix('.json');
});