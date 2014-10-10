var actionService = app.factory('actionService', ['Restangular', function(Restangular) {
  var Device = Restangular.all('devices');

  return {
    getAll: function(deviceId) {
      return Restangular.one('devices', deviceId).getList('actions');
    },
    execute: function(deviceId, actionId, params) {
      // device = Device.get(encodeURI(deviceId));
      // console.log(device);
      // console.log(params);

      // action = Restangular.one('devices', deviceId).one('actions', actionId);
      // console.log(action.customPOST(params, 'execute', params, {}));

      // return 0;

      // var test = Restangular.one('devices', deviceId).one('actions', actionId).post('execute');
      // params = JSON.stringify(params);
      // console.log(params.constructor);
      // for (var i = 0; i < params.length; i++) {
      //   console.log(params[i]);
      // }
      // delete params.$$hashKey;
      // console.log(params);
      return Restangular.one('devices', deviceId).one('actions', actionId).all('execute').post({action_params: params});
      // return Restangular.one('devices', deviceId).one('actions', actionId).execute();
    }
  };
}]);