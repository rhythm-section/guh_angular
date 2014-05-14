app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function () {
          log.console('test');
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});