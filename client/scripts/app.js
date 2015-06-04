//var app = angular.module('app',["ngRoute", "ngResource"]);
var app = angular.module('app',["ngRoute", "ngResource"]);//trying it without resource

app.config(['$routeProvider', '$httpProvider', '$locationProvider',
    function($routeProvider, $httpProvider) {


    $httpProvider.interceptors.push(['$q', '$location',function($q, $location) {
        return {
            response: function(response) {
                // do something on success
                return response;
            },
            responseError: function(response) {
                if (response.status === 401)
                    $location.url('/login');
                return $q.reject(response);
            }
        };
    }]);

    $routeProvider.
        when('/home', {
            templateUrl: "/views/routes/home.html"
        }).
        when('/blog', {
            templateUrl: "/views/routes/blog.html"
        }).
        when('/blogPost', {
            templateUrl: "../views/routes/blogPost.html"
        }).
        when('/login', {
            templateUrl: "/views/routes/login.html",
            controller: "LoginCtrl"
            //resolve: {
            //    loggedin: checkAuth
            //}
        }).
        otherwise({
            redirectTo: "/home"
        });
}]);

app.run(['$rootScope', '$http', function($rootScope, $http){
    $rootScope.checkAuth = function(){
        console.log("rootScope things are happening");
        // Make an AJAX call to check if the user is logged in
        $http.get('/login/loggedin').success(function(data, status, headers, config){
            // Authenticated
            if (data !== '0') {
                console.log(data);
                console.log('Authenticated');
                $rootScope.loggedin = true;
            }
            // Not Authenticated
            else {
                console.log('Not Authenticated');
                $rootScope.loggedin = false;
            }
        }).error(function(data, status, headers, config){
            console.log(data, status);
        });
    };
    $rootScope.logout = function(){
        console.log("logged out rootscope worked");
        $rootScope.message = 'Logged out.';
        $http.post('/login/logout');
        return $rootScope.checkAuth();
    };

}]);
//
app.controller("BlogController", ['$scope', '$http', function($scope, $http){
    //$scope.bPost = {};
    //$scope.posts = [];
    //var fetchPosts = function() {
    //    return $http.get('/posts').then(function(response){
    //        if(response.status !== 200){
    //            throw new Error('Failed to fetch posts from the API');
    //        }
    //        $scope.bPost = {};
    //        $scope.posts = response.data;
    //        console.log(response.data);
    //        return response.data;
    //    })
    //};
    //
    //fetchPosts();
    //
    //$scope.add = function(bPost){
    //    if(!$scope.bPost.title || !$scope.bPost.content) {
    //        alert("You missed a section there");
    //    } else {
    //        return $http.post('/posts', bPost).then(fetchPosts());
    //    }
    //};
}]);
