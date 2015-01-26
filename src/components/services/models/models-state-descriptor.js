(function(){
  "use strict";

  angular
    .module('guh.components.models')
    .factory('StateDescriptor', StateDescriptorFactory);

  StateDescriptorFactory.$inject = [];

  function StateDescriptorFactory() {

    /*
     * Constructor
     * deviceId, eventTypeData
     */
    function StateDescriptor(data) {
      this.deviceId = data.deviceId;
      this.operator = data.operator;
      this.stateTypeId = data.stateTypeId;
      this.value = data.value;
    }

    return StateDescriptor;

  }

}());