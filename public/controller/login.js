chatApp.controller('loginCtrl',function($scope, $http,$state){
    console.log('login');
    $scope.user={
       
        'loginId': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.login = function(){
        console.log("login calling", $scope.user);
    $http({
        method: 'POST',
        url: '/login',
        data: $scope.user
    }).then(function(response){
        if(response.data.Success==true){
            console.log(response.data.message);
            $scope.message="login Successful";
            var token = response.data.token;
            localStorage.setItem("token",token);
            var id = response.data.userid;
            localStorage.setItem("userid",id);
            $state.go('homePage');
        }
        else if(response.data.Success==false){
            $scope.message="login Unsuccessful"
       
     }
    }, function(response)
    {
        console.log(response);
        $scope.message = response.data.message;
    })
    }
    
})