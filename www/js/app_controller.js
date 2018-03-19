function MainCtrl($scope, $http) {
    $scope.isLoaded = true;
    //$scope.api_url = "http://localhost/takeouthotline-api/public/index.php";
    //$scope.api_url = "http://ukcurryconnect-api.takeouthotline.com/public/";
   // $scope.sagepau_url = "http://ukcurryconnect-api.takeouthotline.com/sagepay/lib/SagePay.php";
    $scope.api_url = "http://takeout-api.joenefloresca.xyz/index.php";
}

var myApp = angular.module("myApp");
myApp.controller('MainCtrl', ["$scope", "$http", MainCtrl]);