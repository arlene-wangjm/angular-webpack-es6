let routerConfig = function($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider
	    .state('home', {
	      url: '/',
	      template: '<home></home>'
	    })
	    .state('dashboard', {
	      url: '/dashboard',
	      template: '<dashboard></dashboard>'
	    })
	    .state('login', {
	      url: '/login',
	      template: '<login></login>'
	    })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
};

routerConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];

export default routerConfig;