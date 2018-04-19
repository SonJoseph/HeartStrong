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

    var user = getCookie('user');
    console.log(user);


    $scope.switchView = function(element_id){
        $(element_id).show();
        switch(element_id) {
            case "#newAimForm":
                $("#aimView").hide();
                $("#errorMsg").hide();
                $("#fullAim").hide();
                break;
            case "#aimView":
                $("#newAimForm").hide();
                $("#errorMsg").hide();
                $("#fullAim").hide();
                break;
            case "#fullAim":
                $("#aimView").hide();
                $("#errorMsg").hide();
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
            aimPhoto: $scope.aimImage,
            username: user,
        });
        $http.post("http://sonjoseph.website/heartstrong_backend/addAim.php", data, config).then(function(res){
            if(res.data == "Success!"){
                //set forms back to empty if the user wants to add another aim
                $( '#newAimForm' ).each(function(){
                    this.reset();
                });
                $scope.switchView('#aimViewForm');

            }else{
                $scope.errorMsg = res.data;
                console.log($scope.errorMsg);
                $scope.switchView('#errorMsg');
            }
        });
    }

    //Get aims to dispay in AimView

    $scope.showAims = function() {
      var params = {
        username: user
      };

      $http.get("http://sonjoseph.website/heartstrong_backend/displayAims.php", {config, params}).then(function(res){
         console.log();
         $scope.names = res.data;
      });

    }

    //Get full aim text/ picture to show when name clicked in AimView
    $scope.getAim = function(aimName) {

      var params = {
          aimTitle: aimName,
          username: user,
      };

      $http.get("http://sonjoseph.website/heartstrong_backend/getFullAim.php", {config, params}).then(function(res){
          console.log();
          $scope.switchView('#fullAim');
          $scope.aimText = res.data;

      });

    }

    $scope.showAims();


});

app.controller('vitalsCtrl', function($scope, $http){



});

app.controller('journalCtrl', function($scope, $http){

  var mood = '';



    var mood = happy;
    $scope.chooseMood = function(choice) {
        mood = choice;
    }

    $http.post("http://sonjoseph.website/heartstrong_backend/addJournalEntry.php", data, config).then(function(res){
        console.log();
        var data = $.param({

        });

    });

  var config = {
      headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
  }



  $scope.addEntry = function() {
    var data = $.param({
      journal: $scope.journalInput,
    });

    $http.post("http://sonjoseph.website/heartstrong_backend/addJournalEntry.php", data, mood, config).then(function(res){
        console.log();

    });
  }


});
