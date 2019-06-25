(function () {
var app = angular.module("myApp",['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/signup',{
      templateUrl: 'signup.html'
    })
    .when('/login',{
        templateUrl: 'login.html'
      })
      .when('/pricing',{
        templateUrl: 'pricing.html'
      })
      .when('/service',{
        templateUrl: 'service.html'
      })
      .when('/contact',{
        templateUrl: 'contact.html'
      })
      .when('/get-job-done',{
        templateUrl: 'get-job-done.html'
      })
  });
app.controller('myCtrl', function($scope, $http, $window){
    $scope.dataSet = [];
    $scope.user = {};
    
    $scope.login = function(){
        $http.get('users.json')
        .then(function(res){
            $scope.allUsers = [];
            // $scope.allUsers = res.data;
            var found = 0;
            res.data.forEach(function(u){
                console.log(u);
                if(u.username == $scope.user.username_login && u.password == $scope.user.password_login){
                    found = 1;
                    $scope.allUsers.push(u);
                }
            })
            
            if(found == 1){
                $scope.loginSuccess = 'yes';
                $window.location.href='#';
            }
            else{
                $scope.loginSuccess = 'no';
            }
        })
    }
    $scope.getDataByCategory = function (category){
        $scope.dataReturn = [];
        //Below line gives you all the data stored in the form of array of objects
        
        console.log($scope.dataSet.length)
     
        $scope.dataSet.forEach(function(data){
                if(data.category == category){
                    $scope.dataReturn.push(data);
                }
            })
            if($scope.dataReturn.length > 0){
                 $scope.message1 = $scope.dataReturn;
            }
            else{
                $scope.message1 = $scope.dataReturn
            }
        
    }

    $scope.pushData = function(data){
        $scope.dataSet.push(data);
        console.log(data)
    //    localStorage.setItem("dataSet", JSON.stringify($scope.dataSet));
       var stored = localStorage.getItem("dataSet");
       
        // stored.push(data);
        // localStorage.setItem("dataSet", JSON.stringify(stored));
        
        $scope.message = "Data added Successfully!" + stored;
       
    }

    $scope.save = function(){
        $scope.message = ''
        
        var data = {
            'title': $scope.title,
            'date': $scope.date,
            'category': $scope.category,
            'details': $scope.details,
            'amount': $scope.amount
        }
        
        $scope.pushData(data);
    }
    $scope.getData = function(){
        $scope.message1 = ''
        $scope.getDataByCategory($scope.searchByCategory)
    }
})
}());
