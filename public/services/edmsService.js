angular.module('EDMSService', []).factory('edms', ['$http', '$q', function($http, $q) {
    return {
        goHome: function(user) {
            var deferred = $q.defer();
            
            $http.post('/', user)
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
    };
}]);