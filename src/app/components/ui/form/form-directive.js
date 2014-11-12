angular
  .module('guh.components.ui')
  .directive('guhForm', form);

function form() {

  // var deviceData = {};

  // var addDeviceParam = function() {
  //   // var inputType = '';

  //   // deviceData.device = {};
  //   // deviceData.device.deviceClassId = $scope.wizardData.device.id;
  //   // deviceData.device.deviceParams = [];

  //   // $scope.wizardData.params.forEach(function(param) {
  //   //   inputType = document.getElementById(param.name).getAttribute('type');
  //   //   // console.log(inputType + ' / ' + param.type);

  //   //   switch(inputType) {
  //   //     case 'text':
  //   //     case 'password':
  //   //       delete param.type;
  //   //       param.value = document.getElementById(param.name).value;
  //   //       deviceData.device.deviceParams.push(param);
  //   //       break;
  //   //     case 'checkbox':
  //   //       delete param.type;
  //   //       param.value = (document.getElementById(param.name).checked) ? true : false;
  //   //       deviceData.device.deviceParams.push(param);
  //   //       break;
  //   //   }
  //   // });
  // };

  return {
    controller: ['$scope',
                function($scope) {

      var ctrl = this,
          fields = ctrl.fields = $scope.fields = [];

      ctrl.addField = function() {
        console.log('add field');
      };

      ctrl.submit = function() {
        console.log('form submitted');
      };

      ctrl.cancel = function() {
        console.log('form cancelled');
      };

    }],
    // link: function(scope, elem, attrs) {
    //   console.log('form: link');

    //   scope.onBeforeSubmit = function() {
    //     console.log('submitForm');

    //     var deviceData = [];
    //     for(var i = 0; i < scope.formFields.length; ++i) {
    //       delete scope.formFields[i].type;
    //       deviceData.push(scope.formFields[i]);
    //     }

    //     scope.submitForm({deviceData: deviceData});
    //   };

    //   // addDeviceParam(elem);
    // },
    replace: true,
    restrict: 'E',
    scope: {
      form: '='
    },
    // scope: {
    //   formId: '@',
    //   formFields: '=',
    //   submitForm: '&onFinish'
    // },
    templateUrl: 'app/components/ui/form/form.html',
    transclude: true
  };

}

