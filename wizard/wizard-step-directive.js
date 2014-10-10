app.directive('guhWizardStep', function() {
  return {
    link: function(scope, element, attrs) {
      console.log('Wizard Step');
    },
    replace: true,
    require: '^guhWizard',
    restrict: 'E',
    scope: {
      title: '@'
    },
    templateUrl: 'components/wizard/wizard-step.html',
    transclude: true
  };
});