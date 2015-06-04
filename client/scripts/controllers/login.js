app.controller('LoginCtrl',['$scope','$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
    // Register the login() function
    $scope.login = function(){
        //This is being used instead of checkAuth...?
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
        return $rootScope.checkAuth(); //Stack Overflow suggested answer
    };
    //$scope.logout = function(){
    //    //This is being used instead of checkAuth...?
    //    $http.post('/logout', {
    //        //username: $scope.username,
    //        //password: $scope.password
    //    })
    //        .success(function(user){
    //            // No error: authentication OK
    //            console.log("Logged out");
    //            $location.url('/home');
    //        })
    //        .error(function(){
    //            // Error: authentication failed
    //            console.log("Not authorized");
    //            $location.url('/home');
    //        });
    //    return $rootScope.checkAuth(); //Stack Overflow suggested answer
    //};
}]);

//app.controller('LoginCtrl',['$scope','$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
//    // Register the login() function
//    $scope.login = function(){
//        //This is being used instead of checkAuth...?
//        $http.post('/login', {
//            username: $scope.username,
//            password: $scope.password
//        })
//            .success(function(user){
//                // No error: authentication OK
//                console.log("Logged in");
//                $location.url('/home');
//            })
//            .error(function(){
//                // Error: authentication failed
//                console.log("Not authorized");
//                $location.url('/home');
//            });
//
//    };
//}]);