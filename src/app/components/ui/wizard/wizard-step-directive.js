angular
  .module('guh.components.ui')
  .directive('guhWizardStep', wizardStep);

function wizardStep() {

  var directive = {
    link: link,
    replace: true,
    require: '^guhWizard',
    restrict: 'E',
    scope: {
      title: '@',
    },
    templateUrl: 'app/components/ui/wizard/wizard-step.html',
    transclude: true
  };

  function link(scope, element, attributes, wizardControl) {
    // Add step to wizard
    wizardControl.internal.addStep(scope);
  }

  return directive;

}