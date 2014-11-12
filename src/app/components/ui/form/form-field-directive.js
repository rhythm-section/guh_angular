angular
  .module('guh.components.ui')
  .directive('guhFormField', formField);

formField.$inject = ['$http', '$compile'];

function formField($http, $compile) {

  var getTemplateUrl = function(field) {
    var type = field.type;
    var name = field.name;
    var templateUrl = '';
    var basePath = 'app/components/ui/form/';

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
    link: function(scope, elem, attrs, formCtrl) {
      console.log('formField');
      console.log(scope.formField);

      var templateUrl = getTemplateUrl(scope.formField);
      $http.get(templateUrl).success(function(data) {
          elem.html(data);
          $compile(elem.contents())(scope);
      });

      formCtrl.addField(elem);

      console.log(scope);

      // elem.on('click', function(event) {
      //   event.preventDefault();

      //   console.log('click');
      //   scope.addDevice();
      // });
    },
    // replace: true,
    require: '^guhForm',
    restrict: 'E',
    scope: {
      formField: '='
    },
    template: '{{ formField }}',
    transclude: true
  };
}