app.controller('wizardController',
              ['$scope',
              function($scope) {

  var wizard = this,
      steps = wizard.steps = $scope.steps = [],
      data = wizard.data = $scope.data = {};

  wizard.registerStep = function(step) {
    $scope.steps.push(step);
    // $scope.steps[$scope.currentStepIndex].data = data;
  };

  var toggleSteps = function(showIndex) {
    var event = {event: {fromStep: $scope.currentStepIndex, toStep: showIndex}};

    $scope.steps[$scope.currentStepIndex].currentStep = false;

    $scope.currentStepIndex = showIndex;

    $scope.steps[$scope.currentStepIndex].currentStep = true;
  };

  $scope.showNextStep = function() {
    toggleSteps($scope.currentStepIndex + 1);
  };

  $scope.showPreviousStep = function() {
    toggleSteps($scope.currentStepIndex - 1);
  };

  // $scope.hasNavigation = function() {
  //   return true;
  // };

  $scope.hasNext = function() {
    return $scope.currentStepIndex < ($scope.steps.length - 1);
  };

  $scope.hasPrevious = function() {
    return $scope.currentStepIndex > 0;
  };

  $scope.isCurrentStep = function(step) {
    return ($scope.steps[$scope.currentStepIndex] == step) ? true : false;
  };

}]);

app.directive('wizard', function() {
  return {
    controller: 'wizardController',
    link: function(scope, instanceElement, instanceAttributes) {
      scope.currentStepIndex = 0;
      scope.steps[scope.currentStepIndex].currentStep = true;
    },
    replace: true,
    restrict: 'E',
    scope: {},
    templateUrl: '/components/wizard/wizard.html',
    transclude: true
  };
});