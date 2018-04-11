function getCookie(cname) { //returns value of cookie
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
            console.log(res.data);
            if(res.data=="user created"){
                $scope.show('#loginForm');
            }else{
                $scope.errorMsg = res.data;
                console.log($scope.errorMsg);
                $scope.show('#errorMsg');
            }
        });
    }

    $scope.login = function(){
        var data = $.param({
            username: $scope.username,
            password: $scope.password
        });
        $http.post("http://sonjoseph.website/heartstrong_backend/login.php", data, config).then(function(res){
            if(res.data == "logged in!"){
                window.location.replace("./views/home.html");
            }else{
                $scope.errorMsg = res.data;
                console.log($scope.errorMsg);
                $scope.show('#errorMsg');
            }
        });
    }

});

app.controller('aimsCtrl', function($scope, $http) {
    $scope.switchForm = function(element_id){
        $(element_id).show();
        switch(element_id) {
            case "#newAimForm":
                $("#aimViewForm").hide();
                break;
            case "#aimViewForm":
                $("#newAimForm").hide();
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

    $scope.addAim = function(){
        var data = $.param({
            aimTitle: $scope.aimTitle,
            aimInput: $scope.aimInput,
        });
        $http.post("http://sonjoseph.website/heartstrong_backend/addAim.php", data, config).then(function(res){
            console.log();
        });
    }

    $scope.displayAims = function() {
      var data = $.param({

      });
      $http.post("http://sonjoseph.website/heartstrong_backend/displayAims.php", data, config).then(function(res){
          console.log();
      });
    }

    var user = getCookie('user');
    console.log(user);
});

app.controller('vitalsCtrl', function($scope, $http){
    
});
