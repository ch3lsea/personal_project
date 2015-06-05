app.controller('LogoutCtrl',['$scope','$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
    $scope.logout = function(){
        $http.post('/login/logout', {})
            .success(function(user){
                // No error: authentication OK
                $location.url('/home');
            })
            .error(function(){
                // Error: authentication failed
                console.log("logout error");
                $location.url('/home');
            });
        return $rootScope.checkAuth();
    };
}]);