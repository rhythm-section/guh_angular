(function(){
  "use strict";

  angular
    .module('guh.components.models')
    .factory('EventDescriptor', EventDescriptorFactory);

  EventDescriptorFactory.$inject = ['$log', 'ParamDescriptor'];

  function EventDescriptorFactory($log, ParamDescriptor) {

    /*
     * Constructor
     */
    function EventDescriptor(data) {
      // Create paramDescriptors
      var paramDescriptors = [];
      angular.forEach(data.paramTypes, function(paramTypeData, index) {
        paramDescriptors[index] = new ParamDescriptor(paramTypeData);
      });

      this.deviceId = data.deviceId;
      this.eventTypeId = data.eventTypeId;
      this.paramDescriptors = paramDescriptors;
    }

    return EventDescriptor;

  }

}());