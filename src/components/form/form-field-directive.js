app.directive('formField',
              ['$http', '$compile',
              function($http, $compile) {

  var getTemplateUrl = function(field) {
    var type = field.type;
    var name = field.name;
    var templateUrl = '';
    var basePath = '/components/form/';

    switch(type) {
      case 'bool':
        field.value = false;
        templateUrl = basePath + 'form-field-radio.html';
        break;
      case 'int':
        field.value = 0;
        templateUrl = basePath + 'form-field-text.html';
        break;
      case 'double':
        field.value = 0.0;
        templateUrl = basePath + 'form-field-text.html';
        break;
      case 'QString':
        field.value = '';
        switch(name) {
          case 'password':
            templateUrl = basePath + 'form-field-password.html';
            break;
          case 'recipient':
            templateUrl = basePath + 'form-field-email.html';
            break;
          default:
            templateUrl = basePath + 'form-field-text.html';
            break;
        }
        break;
    }

    return templateUrl;
  };

  return {
    link: function(scope, instanceElement, instanceAttributes) {
      console.log('formField');

      var templateUrl = getTemplateUrl(scope.formField);
      $http.get(templateUrl).success(function(data) {
          instanceElement.html(data);
          $compile(instanceElement.contents())(scope);
      });

      console.log(scope);

      // instanceElement.on('click', function(event) {
      //   event.preventDefault();

      //   console.log('click');
      //   scope.addDevice();
      // });
    },
    restrict: 'E',
    scope: {
      formField: '='
    },
    template: '{{ formField }}'
  };
}]);