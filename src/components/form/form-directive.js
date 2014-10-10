app.directive('form',
             function() {

  var deviceData = {};

  var addDeviceParam = function() {
    // var inputType = '';

    // deviceData.device = {};
    // deviceData.device.deviceClassId = $scope.wizardData.device.id;
    // deviceData.device.deviceParams = [];

    // $scope.wizardData.params.forEach(function(param) {
    //   inputType = document.getElementById(param.name).getAttribute('type');
    //   // console.log(inputType + ' / ' + param.type);

    //   switch(inputType) {
    //     case 'text':
    //     case 'password':
    //       delete param.type;
    //       param.value = document.getElementById(param.name).value;
    //       deviceData.device.deviceParams.push(param);
    //       break;
    //     case 'checkbox':
    //       delete param.type;
    //       param.value = (document.getElementById(param.name).checked) ? true : false;
    //       deviceData.device.deviceParams.push(param);
    //       break;
    //   }
    // });
  };

  return {
    link: function(scope, instanceElement, instanceAttribtues) {
      console.log('form: link');

      scope.onBeforeSubmit = function() {
        console.log('submitForm');

        var deviceData = [];
        for(var i = 0; i < scope.formFields.length; ++i) {
          delete scope.formFields[i].type;
          deviceData.push(scope.formFields[i]);
        }

        scope.submitForm({deviceData: deviceData});
      };

      // addDeviceParam(instanceElement);
    },
    restrict: 'E',
    scope: {
      formId: '@',
      formFields: '=',
      submitForm: '&onFinish'
    },
    templateUrl: '/components/form/form.html'
  };

});