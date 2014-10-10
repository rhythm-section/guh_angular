app.directive('wizardStep',
             function() {

  return {
    link: function(scope, instanceElement, instanceAttributes, wizardController) {
      wizardController.registerStep(scope);

      // scope.$watch('data', function(newValue, oldValue) {
      //   console.log(oldValue);
      //   console.log(newValue);
      // });
    },
    replace: true,
    require: "^wizard",
    restrict: 'E',
    scope: {
      title: '@',
      data: '@'
    },
    templateUrl: '/components/wizard/wizard-step.html',
    transclude: true
  };

});