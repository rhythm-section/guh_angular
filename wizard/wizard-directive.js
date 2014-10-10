app.directive('guhWizard', function() {
  return {
    controller: ['$scope', function($scope) {
      
    }],
    link: function(scope, element, attrs) {
      console.log('Wizard');
    },
    replace: true,
    restrict: 'E',
    templateUrl: 'components/wizard/wizard.html',
    transclude: true
  };
});