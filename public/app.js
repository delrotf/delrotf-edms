var edmsApp = angular.module('edmsApp', ['ngRoute', 'EmployeesService']);

edmsApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'mainController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
