var app = angular.module('userApp', []);

var config = {
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
}

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
                localStorage.user =("user",$scope.username);
                window.location.replace("./views/home.html");
            }else{
                $scope.errorMsg = res.data;
                console.log($scope.errorMsg);
                $scope.show('#errorMsg');
            }
        });
    }

});


//Listens for changes to input and change value in variable scope
app.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);

//Use when need to do fileUpload
app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, name, text, username){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('name', name);
         fd.append('text', text);
         console.log(text);
         fd.append('username', username);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(){
            console.log("Success");
         })
         .error(function(){
            console.log("Not Success");
         });
     }
 }]);

app.controller('aimsCtrl', ['$scope', '$http', 'fileUpload', function($scope, $http, fileUpload) {

    var user = localStorage.getItem("user");
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
                $scope.showAims();
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
        var file = $scope.aimImage;
        var uploadUrl = "http://sonjoseph.website/heartstrong_backend/addAim.php";
        var name = $scope.aimTitle;
        var text = $scope.aimInput;
        fileUpload.uploadFileToUrl(file, uploadUrl, name, text, user);
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


}]);


app.controller('vitalsCtrl', function($scope, $http){
    $scope.submitWeight = function(){
        console.log($scope.unit);
        console.log($scope.weight);
//        var data = $.param({
//
//        })
    }
});

app.controller('journalCtrl', function($scope, $http){

    var user = localStorage.getItem("user");
    console.log(user);

    var mood = "";
    $scope.chooseMood = function(choice) {
        mood = choice;
    }

    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }



    $scope.addEntry = function(){
        var data = $.param({
            username: user,

            //username: user,
            journal: $scope.journalInput,
            mood: mood,
        });
        $http.post("http://sonjoseph.website/heartstrong_backend/addJournalEntry.php", data, config).then(function(res){
            console.log();
            if(res.data == "Success!"){
                $( '#journalInput' ).each(function(){
                    this.reset();
                });
            }else{
                $scope.errorMsg = res.data;
                console.log($scope.errorMsg);
            }
        });
    }
});
