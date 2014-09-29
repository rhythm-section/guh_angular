devices.directive('guhToggle', function() {
  var uniqueId = 1;

  return {
    link: function(scope, element, attributes) {
      var item = 'toggle' + uniqueId++;
      element.find('input').attr('id' , item);
      element.find('input').attr('name' , item);
      element.find('label').attr('for', item);

      element.bind('click', function(event) {
        event.preventDefault();
        var isChecked = element.find('input').attr('checked');

        if(isChecked) {
          element.find('input').attr('checked', false);
          isChecked = false;
        } else {
          element.find('input').attr('checked', true);
          isChecked = true;
        }
      });
    },
    replace: true,
    restrict: 'E',
    scope: {},
    templateUrl: 'components/inputs/toggle-switch/inputs-toggle-switch.html',
    $$tlb: true,
    transclude: true
  };
});