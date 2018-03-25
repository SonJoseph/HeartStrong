var app = angular.module('userApp', []);

app.controller('userCtrl', function($scope, $http){

    $scope.show = function(element_id){
        $(element_id).show();
        switch(element_id) {
            case "#registerForm":
                $("#loginForm").hide();
                $("#errorMsg").hide();
                break;
            case "#loginForm":
                $("#registerForm").hide();
                $("#errorMsg").hide();
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
            address: $scope.address,
            username: $scope.username,
            password: $scope.password
        });
        $http.post("http://sonjoseph.website/heartstrong_backend/register.php", data, config).then(function(res){
<<<<<<< HEAD

=======
            console.log(res.data);
            if(res.data=="user created"){
                $scope.show('#loginForm');
            }else{
                $scope.errorMsg = res.data;
                console.log($scope.errorMsg);
                $scope.show('#errorMsg');
            }
>>>>>>> e7bca5fd3c2472eb3b3b9fc6bd5f04f025e367c7
        });
    }

    $scope.login = function(){
        var data = $.param({
            username: $scope.username,
            password: $scope.password
        });
        $http.post("http://sonjoseph.website/heartstrong_backend/login.php", data, config).then(function(res){
            if(res.data == "logged in!"){
                window.location.replace("/nav.html");
            }else{
                $scope.errorMsg = res.data;
                console.log($scope.errorMsg);
                $scope.show('#errorMsg');
            }
        });
    }

});

app.controller('aimsCtrl', function($scope, $http){

  $http.get("http://sonjoseph.website/heartstrong_backend/connect.php").then(function(res){

  });

  var config = {
      headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
  }

  $scope.addAim = function(){
      var data = $.param({
          aimtext: $scope.atext
      });
      $http.post("http://sonjoseph.website/heartstrong_backend/addAim.php", data, config).then(function(res){
      });
  }


});
