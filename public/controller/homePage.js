chatApp.controller('homeCtrl', function($scope, $http) {
    console.log('home');
    $scope.user = {
        message: 'hii'
    }
    console.log($scope.user.message);
});