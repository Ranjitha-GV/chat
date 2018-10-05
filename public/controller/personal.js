// var chatApp = angular.module('singleChatController', []);
chatApp.controller('singleChatCntrl', function ($scope, $http, $state, SocketService) {

    $scope.chatlist = [];
    var senderId = localStorage.getItem('userid');
    var senderName = localStorage.getItem('username');
    var receiverId = localStorage.getItem('ruserId');
    var receiverName = localStorage.getItem('rusername');
    var id=localStorage.getItem("userid");
    var mytoken = localStorage.getItem("token");
    var username=localStorage.getItem("username");
    $scope.val = receiverName;
    var arr = [];
    $scope.currUser = username;
    $scope.message = '';

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
    $scope.close = function () {
        $state.go('home');
        localStorage.removeItem('ruserId');
        localStorage.removeItem('rusername');
    }

    uname = [];
    uname.push(senderName + " : " + receiverName);
    $scope.userName = uname;
    var response={};

   
    // $scope.person=function(name){
    //     console.log(name);
    //     localStorage.setItem('rusername',name);
    //     localStorage.setItem('ruserId',id);
    //     $location.path('/home2');
    // }
    $scope.send = function () {
       // console.log($scope.message);
        //console.log($scope.chatlist);

        SocketService.emit('singleChatBackend', { 'senderId': senderId, 'senderName': senderName, 'receiverId': receiverId, 'receiverName': receiverName, 'message': $scope.message, 'date': new Date() })
        $scope.chatlist.push({ 'senderId': senderId, 'senderName': senderName, 'receiverId': receiverId, 'receiverName': receiverName, 'message': $scope.message, 'date': new Date() })
        $scope.message = null;
    }
console.log(receiverId);

    $http({


        method: 'GET',
        url: '/users/singleChatlist/' + receiverId + '/and/' + senderId,

    }).then(function (response) {
   console.log("entered console");
   console.log(response);

        //console.log(response.data.message[0].message);
        for (var i = 0; i < response.data.message.length; i++) {

            chatlist.push(response.data.message[i])
        }
        $scope.chatlist = response.data.message;

    })
    // console.log(response.data)

    SocketService.on(senderId, function (msg) {

        console.log(msg);
        $scope.chatlist.push(msg)
    });

    $scope.currUser = senderName;

})