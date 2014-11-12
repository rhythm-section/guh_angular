angular
  .module('guh.devices')
  .factory('Device', Device);

function Device() {
  var Constructor = function(restangularObject) {
    var model = restangularObject;

    return model;
  };

  return Constructor;
}