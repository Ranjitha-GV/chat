chatApp.controller('homecontroller', function ($scope, $http,$location, SocketService) {
var mytoken = localStorage.getItem("token");
var id=localStorage.getItem("userid");
var username=localStorage.getItem("username");
$scope.currUser = username;
console.log("id is"+id)
   var arr=[];
   var msgArr=[];
   var socket = io.connect('http://localhost:4000');
$http({
    method: 'GET',
    url: 'auth/users/'+id+'/list',
    headers:{
        'token': mytoken
    }
}).then(function (response) {
    arr=response.data.message;
    $scope.arr = arr;
})

$scope.person=function(userData){
    console.log(name);
    localStorage.setItem('rusername',userData.loginId);
    localStorage.setItem('ruserId',userData.userid);
    $location.path('/home2');
}
    $scope.sendMessage = function () {
        SocketService.emit('tobackend', { "userid": id, "message": $scope.message, "date": new Date(),"username":username })
        $scope.message = null;
    }
    


    $http({
        method: 'GET',
        url: '/auth/users/'+id+'/msgs',
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
        for(var i=0;i<(response.data.message).length;i++)
        msgArr.push(response.data.message[i]);
        // nameArr.push(response.data.message[i].username);
    })
    $scope.msgArr=msgArr;
  
    SocketService.on('tofrontend',function(msg){
        $scope.msgArr.push(msg);
    })


    $scope.logout=function () {
        localStorage.removeItem(token);
        localStorage.removeItem(userid);
        $location.path('/login');

    }
    $scope.navigate = function (user) {
        // console.log(user)
        localStorage.setItem("peerUser", user)
        $location.path('/home2');
    }
})

