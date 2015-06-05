app.controller('LoginCtrl',['$scope','$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
    // Register the login() function
    $scope.login = function(){
        $http.post('/login', {
            username: $scope.username,
            password: $scope.password
        })
            .success(function(user){
                // No error: authentication OK
                console.log("Logged in");
                $location.url('/home');
            })
            .error(function(){
                // Error: authentication failed
                console.log("Not authorized");
                $location.url('/home');
            });
        return $rootScope.checkAuth();
    };
}]);