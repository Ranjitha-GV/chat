chatApp.controller('ctrl',function($scope, $http){  
          
    $scope.funcSave = function()  
    {  
       if($scope.SaveForm.$valid) {
         "class" = "ng-hide";
          }  
       else  
       {  
         "class" = "ng-show";
       }
    }  
 });