(function(){
"use strict";

  angular
    .module('guh.components.ui')
    .directive('guhInput', input);

  input.$inject = ['$log', '$http', '$compile'];

  function input($log, $http, $compile) {
    var directive = {
      link: inputLink,
      restrict: 'A',
      scope: {
        model: '=guhInput'
      }
    };

    return directive;


    /* jshint unused: vars */
    function inputLink(scope, element, attributes) {      
      scope.$on('$destroy', function() {
        // Remove only element, scope needed afterwards
        element.remove();
      });

      scope.$watch('model', function(newValue, oldValue) {
        $log.log(scope.model);
        var templateUrl = scope.model.getInputTemplate();

        $http.get(templateUrl).success(function(template) {
          // Replace guhInput-directive with proper HTML input
          // var guhInput = angular.element(template);
          // var clonedElement = $compile(guhInput)(scope);

          // element.replaceWith(clonedElement);
          // element = clonedElement;

          element.html(template);
          $compile(element.contents())(scope);
        });
      });
      // }, true);
    }
  }

}());