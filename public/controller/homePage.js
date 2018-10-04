chatApp.controller('homecontroller', function ($scope, $http,$location, SocketService) {
var mytoken = localStorage.getItem("token");
var id=localStorage.getItem("userid");
var senderId = localStorage.getItem("senderId");
var username=localStorage.getItem("username");
var receiverName=localStorage.getItem("receiverName");
$scope.receiverName=receiverName;
var senderName=localStorage.getItem("senderName");
$scope.senderName=senderName;
var receiverId=localStorage.getItem("receiverId");
$scope.currUser = username;
$scope.mid = 0;
console.log("id is"+id)
   var arr=[];
   var msgArr=[],msgArr2=[];
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

   
$http({
        method: 'GET',
        url: '/auth/users/' + senderId + '/msg/' + receiverId,
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
        console.log(response.data.message)

        // for (var i = 0; i < (response.data.message).length; i++)
            $scope.msgArr2=response.data.message;
    })
    // $scope.msgArr = msgArr;
    console.log(msgArr2)

    $scope.sendMessage = function () {
        if ($scope.message != null)
            SocketService.emit('topersonalbackend', { "senderId": senderId, "message": $scope.message, "date": new Date(), "senderName": senderName,"receiverId":receiverId,"receiverName":receiverName})
        $scope.msgArr2.push({ "senderid": senderId, "message": $scope.message, "date": new Date(), "sendername": senderName, "receiverid": receiverId, "receivername": receiverName})
        $scope.message = " ";
    }

    $scope.move = function(username)
    {
        console.log(username);
        $scope.mid = 1;
        console.log($scope.mid);
    }

    $scope.close=function () {

        $scope.mid = 0;
        $scope.message = null;
        
    }
    SocketService.on(id,function(msg){
            $cope.msgArr2.push(msg);
    })
})

