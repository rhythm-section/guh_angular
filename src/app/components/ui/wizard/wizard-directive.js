// Base wizard by: https://github.com/smsohan/angular_wizard/blob/master/main.js
// Added external controls (next, prev, hasNext, hasPrev)

// execution sequence
// 1. compile
// 2. controller
// 3. pre-link
// 4. post-link
// more info: http://www.jvandemo.com/the-nitty-gritty-of-compile-and-link-functions-inside-angularjs-directives
// more info: http://odetocode.com/blogs/scott/archive/2014/05/28/compile-pre-and-post-linking-in-angularjs.aspx

angular
  .module('guh.components.ui')
  .directive('guhWizard', wizard);

function wizard() {

  var directive = {
    controller: WizardController,
    controllerAs: 'wizardControl',
    link: link,
    replace: true,
    restrict: 'E',
    scope: {
      control: '=',
      onBeforeStepCahnge: '&',
      onStepCahnge: '&',
      onAfterStepCahnge: '&',
    },
    templateUrl: 'app/components/ui/wizard/wizard.html',
    transclude: true
  };

  WizardController.$inject = ['$scope'];
  function WizardController($scope) {
    var guh = this;

    // Adding object for internal controls
    guh.internal = {};

    guh.internal.steps = [];

    // $scope.wizardControl = {};
    // $scope.wizardControl.steps = [];

    guh.internal.addStep = function(step) {
      guh.internal.steps.push(step);
    };

    guh.internal.toggleSteps = function(showIndex) {
      // var event = {event: {fromStep: $scope.currentStepIndex, toStep: showIndex}};

      // if($scope.onBeforeStepChange){
      //   $scope.onBeforeStepChange(event);
      // }
      guh.internal.steps[guh.internal.currentStepIndex].currentStep = false;

      // if($scope.onStepChanging){
      //   $scope.onStepChanging(event);
      // }
      guh.internal.currentStepIndex = showIndex;

      guh.internal.steps[guh.internal.currentStepIndex].currentStep = true;
      // if($scope.onAfterStepChange){
      //   $scope.onAfterStepChange(event);
      // }
    };
  }

  function link(scope, element, attributes) {
    // Allows wizard to be controlled from the outside (e.g. from devices-add-controller.js)
    scope.wizardControl.external = scope.control || {};

    // Check if there are any steps in the wizard
    if(scope.wizardControl.internal.steps.length !== 0) {
      scope.wizardControl.internal.currentStepIndex = 0;
      scope.wizardControl.internal.steps[scope.wizardControl.internal.currentStepIndex].currentStep = true;
    }

    scope.wizardControl.external.next = function() {
      if(scope.wizardControl.external.hasNext()) {
        scope.wizardControl.internal.toggleSteps(scope.wizardControl.internal.currentStepIndex + 1);
      }
    };

    scope.wizardControl.external.prev = function() {
      if(scope.wizardControl.external.hasPrev) {
        scope.wizardControl.internal.toggleSteps(scope.wizardControl.internal.currentStepIndex - 1);
      }
    };

    scope.wizardControl.external.hasNext = function() {
      return scope.wizardControl.internal.currentStepIndex < (scope.wizardControl.internal.steps.length - 1);
    };

    scope.wizardControl.external.hasPrev = function() {
      return scope.wizardControl.internal.currentStepIndex > 0;
    };
  }

  return directive;

}