app.controller('LogoutCtrl',['$scope','$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
    $scope.logout = function(){
        //This is being used instead of checkAuth...?
        $http.post('/login/logout', {
            //username: $scope.username,
            //password: $scope.password
        })
            .success(function(user){
                // No error: authentication OK
                console.log("Logged out");
                $location.url('/home');
            })
            .error(function(){
                // Error: authentication failed
                console.log("Not authorized");
                $location.url('/home');
            });
        return $rootScope.checkAuth(); //Stack Overflow suggested answer
    };
}]);