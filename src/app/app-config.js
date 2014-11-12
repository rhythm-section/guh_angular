angular
  .module('guh')
  .config(configure)
  .run(run);

configure.$inject = ['$urlRouterProvider', '$stateProvider', 'RestangularProvider'];

function configure($urlRouterProvider, $stateProvider, RestangularProvider) {
  console.log('guh: configure');
  console.log(window);

  $urlRouterProvider.otherwise("/guh/widgets");

  $stateProvider
    .state('guh', {
      abstract: true,
      controller: 'GuhController',
      controllerAs: 'guh',
      reload: true,
      url: '/guh',
      templateUrl: 'app/app.html'
    })
    .state('guh.widgets', {
      url: '/widgets',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('guh.devices', {
      abstract: true,
      url: '/devices',
      template: '<ui-view/>'
    });
}

function run() {
  FastClick.attach(document.body);
}