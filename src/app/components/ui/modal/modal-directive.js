angular
  .module('guh.components.ui')
  .directive('guhModal', modal);

function modal() {
  var directive = {
    link: link,
    replace: true,
    restrict: 'E',
    scope: {
    },
    templateUrl: 'app/components/ui/modal/modal.html',
    transclude: true
  };

  function link(scope, element, attributes) {

  }

  return directive;
}