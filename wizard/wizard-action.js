app.directive('guhWizardAction', function() {
  return {
    link: function(scope, element, attrs) {
      console.log('Wizard Action');
    },
    replace: false,
    require: '^guhWizard',
    restrict: 'A',
    scope: {
      title: '@'
    },
    templateUrl: 'components/wizard/wizard-step.html',
    transclude: true
  };
});