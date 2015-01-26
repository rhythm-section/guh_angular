(function(){
"use strict";

  angular
    .module('guh.components.ui')
    .directive('guhWizardStep', wizardStep);

  wizardStep.$inject = [];

  function wizardStep() {

    var directive = {
      link: wizardStepLink,
      replace: true,
      require: '^guhWizard',
      restrict: 'E',
      scope: {
        title: '@',
      },
      templateUrl: 'components/directives/wizard/wizard-step.html',
      transclude: true
    };

    function wizardStepLink(scope, element, attributes, wizardControl) {
      // Add step to wizard
      wizardControl.internal.addStep(scope);
    }

    return directive;

  }

}());