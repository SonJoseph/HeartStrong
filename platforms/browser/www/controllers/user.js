var app = angular.module('userApp', []);

app.controller('userCtrl', function($scope, $http){
    
    $scope.show = function(element_id){
        $(element_id).show();
        switch(element_id) {
            case "#registerForm":
                $("#loginForm").hide();
                break;
            case "#loginForm":
                $("#registerForm").hide();
                break;
        }
    }
    $http.get("http://sonjoseph.website/heartstrong_backend/connect.php").then(function(res){
        
    });
    
    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }
    
    $scope.register = function(){
        // use $.param jQuery function to serialize data from JSON
        var data = $.param({
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            age: $scope.age,
            address: $scope.address
        });
        $http.post("http://sonjoseph.website/heartstrong_backend/register.php", data, config).then(function(res){
            
        });
    }
    
    $scope.login = function(){
        var data = $.param({
            username: $scope.username
        });
        $http.post("http://sonjoseph.website/heartstrong_backend/login.php", data, config).then(function(res){
            console.log(res.data);
            window.location = window.location + "\mock.html";
        });
    }
    
});