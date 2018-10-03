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
    console.log(response.data.message)
    for(var i=0;i<(response.data.message).length;i++){
        arr.push(response.data.message[i].loginId)
    }
    console.log(arr);
})
$scope.arr = arr;

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

    $scope.move = function(username)
    {
        $scope.name = username;
        $location.path('#!/home2');
        }

})