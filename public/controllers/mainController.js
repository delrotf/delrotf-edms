angular.module('edmsApp').controller('mainController', function($scope, Employees) {
    $scope.employees = [];
    $scope.activeEmployee = {};
    $scope.showDetailsForm = false;
    $scope.showCreateForm = false;
    $scope.hideRegistrationPanel = true;
    
    $scope.getAllEmployees = function() {
        Employees.getAll()
            .then(function(data) {
                $scope.employees = data;
            }, function(err) {
                console.log("Could not load employees");
            });
    }
    
    //$scope.getAllEmployees();
    
    $scope.createEmployee = function(data) {
        Employees.create(data)
            .then(function(data) {
                console.log('Employee created.');
                $scope.btnRegisterDisabled = false;
                //$scope.getAllEmployees();
            }, function(err) {
                console.log('Could not creat employee');
                $scope.btnRegisterDisabled = false;
            });
            
            $scope.showCreateForm = false;
        
    }
    
    $scope.updateEmployee = function(employee) {
        Employees.update(employee._id, employee)
            .then(function(data) {
                console.log('Employee updated.');
                $scope.employees.concat(data);
                
                $scope.showDetailsForm = false;
                $scope.activeEmployee = {};
            }, function(err) {
                console.log('Could not update employee.')
                $scope.showDetailsForm = false;
                $scope.activeEmployee = {};
            });
    }
    
    $scope.deleteEmployee = function(employee) {
        Employees.delete(employee._id)
            .then(function(data) {
                console.log('Employee deleted.');
                $scope.getAllEmployees();
            }, function(err) {
                console.log(err);
            });
    }
    
    $scope.showDetails = function(employee) {
        $scope.showDetailsForm = true;
        $scope.activeEmployee = employee;
    }
});