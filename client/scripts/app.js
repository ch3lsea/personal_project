var app = angular.module('app',["ngRoute", "ngResource", 'appControllers', 'ui.bootstrap']);
var appControllers = angular.module('appControllers', []);

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
            templateUrl: "/views/routes/blog.html",
            controller: "BlogController"
        }).
        when('/code', {
            templateUrl: "/views/routes/code.html",
            controller: "AccordionCtrl"
        }).
        when('/blogPost', {
            templateUrl: "/private/views/routes/blogPost.html"
        }).
        when('/login', {
            templateUrl: "/views/routes/login.html",
            controller: "LoginCtrl"
        }).
        otherwise({
            redirectTo: "/home"
        });
}]);

app.run(['$rootScope', '$http', function($rootScope, $http){
    $rootScope.checkAuth = function(){
        // Make an AJAX call to check if the user is logged in
        $http.get('/login/loggedin').success(function(data, status, headers, config){
            // Authenticated
            if (data !== '0') {
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
        $rootScope.message = 'Logged out.';
        $http.post('/login/logout');
        return $rootScope.checkAuth();
    };

}]);
//
app.controller("BlogController", ['$scope', '$http', function($scope, $http){
    $scope.bPost = {};
    $scope.posts = [];
    var fetchPosts = function() {
        return $http.get('/posts').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch posts from the API');
            }
            $scope.bPost = {};
            $scope.posts = response.data;
            return response.data;
        })
    };
    fetchPosts();
    $scope.add = function(bPost){
        if(!$scope.bPost.title || !$scope.bPost.content) {
            alert("You missed a section there");
        } else {
            return $http.post('/posts', bPost).then(fetchPosts());
        }
    };
    $scope.delete = function(id){
        console.log("Delete button client-side hit");
        return $http.delete('/posts' + id).then(fetchPosts());
    };
    $scope.status = {
        isOpen: true,
        isClosed: false
    };
}]);
app.controller('AccordionCtrl', ['$scope', function ($scope) {
    $scope.status = {
        isOpen: true,
        isClosed: false
    };
}]);