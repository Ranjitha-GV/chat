chatApp.controller('homecontroller', function ($scope, $http,$location) {
var mytoken = localStorage.getItem("token");
var id=localStorage.getItem("userid");
console.log("id is"+id)
   var arr=[];
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
    $scope.logout=function () {
        localStorage.removeItem(token);
        localStorage.removeItem(userid);
        $location.path('/login');

    }
}) 
// SocketService.emit('toBackEnd', "Hello", { date: new Date() })
// SocketService.on('message', function(msg) {
//     $scope.array.push(msg)
// });