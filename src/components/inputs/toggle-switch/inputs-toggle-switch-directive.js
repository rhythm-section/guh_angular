devices.directive('guhToggle', function(actionService) {
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

          console.log('data attributes:');
          console.log(attributes);

          var deviceId = scope.$parent.$parent.$parent.$parent.device.id;
          var actionId = scope.$parent.$parent.$parent.action.id;
          var actionParams = scope.$parent.$parent.$parent.action.params;
          console.log('Scope:');
          console.log(scope);

          actionService.execute(deviceId, actionId, actionParams);
        }
      });
    },
    replace: true,
    restrict: 'E',
    scope: {
      param: "=param"
    },
    templateUrl: 'components/inputs/toggle-switch/inputs-toggle-switch.html',
    $$tlb: true,
    transclude: true
  };
});