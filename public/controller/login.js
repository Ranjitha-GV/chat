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
            $state.go('homePage');
        }
        else if(response.data.Success==false){
            $scope.message="login Unsuccessful"
       
     }
    }, function(err)
    {
        console.log(err);
        $scope.content = "something went wrong";
    })
    }
    
})