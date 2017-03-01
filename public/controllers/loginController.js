angular.module('edmsApp').controller('loginController', function($scope, $location, Employees) {
    $scope.grantAccess = function(user) {
        $scope.shake = false;
        $scope.withError = false;
        
        Employees.grantAccess(user)
            .then(function(data) {
                if(data === 'OK') {
                    $location.path('/dashboard');
                } else {
                    $scope.withError = true;
                }
                $scope.employees = data;
                $scope.shake = true;
                $scope.btnLoginDisabled = false;
                console.log("grantAccess " + JSON.stringify(data));
            }, function(err) {
                console.log(err);
                $scope.shake = true;
                $scope.btnLoginDisabled = false;
            });
    };
})