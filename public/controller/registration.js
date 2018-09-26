chatApp.controller('registerCtrl', function($scope, $http) {
    // console.log('register');
    $scope.user = {
        'firstname': '',
        'lastname': '',
        'username':'',
        'phonenumber': '',
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.register = function(){
       console.log("register calling", $scope.user);
    $http({
        method: 'POST',
        url: '/register',
        data: $scope.user
    }).then(function(response){
        console.log(response);
        console.log(response.data.error);
        
        if(response.data.error==true){
            console.log("successful");
            $scope.message="Registration Successful";
            $state.go('#!/login');
        }
        else if(response.data.error==false){
            console.log(response.data.error)
            $scope.message = response.data.message;
        }
    },
    function(response)
    {
        console.log(response);
        $scope.message = response.data.message;
    })
  }
});