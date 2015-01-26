(function(){
  "use strict";

  angular
    .module('guh.components.models')
    .factory('ParamDescriptor', ParamDescriptorFactory);

  ParamDescriptorFactory.$inject = [];

  function ParamDescriptorFactory() {

    /*
     * Constructor
     */
    function ParamDescriptor(data) {
      this.name = data.name;
      this.value = data.value;
      this.operator = data.operator;
    }

    /*
     * Public prototype methods
     */
    angular.extend(ParamDescriptor.prototype, {
      setOperator: setOperator
    });

    return ParamDescriptor;
   

    /*
     * Public prototype method: setOperator
     */
    function setOperator(operator) {
      /* jshint validthis:true */
      var self = this;

      self.operator = operator;
    }

  }

}());