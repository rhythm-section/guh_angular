var actionService = app.factory('actionService', ['Restangular', function(Restangular) {
  var Device = Restangular.all('devices');

  return {
    getAll: function(deviceId) {
      return Restangular.one('devices', deviceId).getList('actions');
    },
    execute: function(actionId) {
      // return Restangular.one('devices', deviceId)
    }
  };
}]);