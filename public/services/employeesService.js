angular.module('EmployeesService', []).factory('Employees', ['$http', '$q', function($http, $q) {
    return {
        grantAccess: function(user) {
            var deferred = $q.defer();
            
            $http.post('/api/login', user)
                .success(function(data) {
                    console.log("data" + JSON.stringify(data));
                    deferred.resolve(data);
                })
                .error(function(err) {
                    console.log(err);
                    deferred.resolve(err);
                });
                
            return deferred.promise;
        },
        getAll: function() {
            var deferred = $q.defer();
            
            $http.get('/api/employees')
                .success(function(data) {
                    console.log("data" + JSON.stringify(data));
                    deferred.resolve(data);
                })
                .error(function(err) {
                    console.log(err);
                    deferred.resolve(err);
                });
                
            return deferred.promise;
        },
        get: function(id) {
            var deferred = $q.defer();
            
            $http.get('/api/employees/' + id)
                .success(function(data) {
                    console.log("data" + JSON.stringify(data));
                    deferred.resolve(data);
                })
                .error(function(err) {
                    console.log(err);
                    deferred.resolve(err);
                });
                
            return deferred.promise;
        },
        create: function(data) {
            var deferred = $q.defer();
            
            $http.post('/api/employees', data)
                .success(function(data) {
                    console.log("data" + JSON.stringify(data));
                    deferred.resolve(data);
                })
                .error(function(err) {
                    console.log(err);
                    deferred.resolve(err);
                });
                
            return deferred.promise;
        },
        update: function(id, data) {
            var deferred = $q.defer();
            
            $http.put('/api/employees/' + id, data)
                .success(function(data) {
                    console.log("data" + JSON.stringify(data));
                    deferred.resolve(data);
                })
                .error(function(err) {
                    console.log(err);
                    deferred.resolve(err);
                });
                
            return deferred.promise;
        },
        delete: function(id) {
            var deferred = $q.defer();
            
            $http.delete('/api/employees/' + id)
                .success(function(data) {
                    console.log("data" + JSON.stringify(data));
                    deferred.resolve(data);
                })
                .error(function(err) {
                    console.log(err);
                    deferred.resolve(err);
                });
                
            return deferred.promise;
        }
    };
}]);