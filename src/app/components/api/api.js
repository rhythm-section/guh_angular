angular
  .module('guh.components.api', [
    'restangular'
  ])
  .config(configure);

configure.$inject = ['RestangularProvider'];

function configure(RestangularProvider) {
  // Configure REST-API
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

  RestangularProvider.setResponseExtractor(function(response) {
    // console.log('RESTANGULAR!!!');
    // console.log(response);

    var newResponse = response;
    // newResponse.originalElement = {};
    if (angular.isArray(response)) {
      angular.forEach(newResponse, function(value, key) {
        newResponse[key].originalElement = angular.copy(value);
        // newResponse.originalElement[key] = angular.copy(value);
      });
    } else {
      newResponse.originalElement = angular.copy(response);
    }
    // console.log(newResponse);

    return newResponse;
  });
}