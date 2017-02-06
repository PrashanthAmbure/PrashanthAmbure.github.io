var app = angular.module('gitHubUserInfo', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('userInfoCtrl', function($scope, $http) {
	var onSuccess = function(response) {
        $scope.user = response.data;
    };

    var onFailure = function(failureReason) {
        $scope.failureMsg = failureReason.data;
        $scope.user = null;
    };

    $http.get('https://api.github.com/users/PrashanthAmbure')
        .then(onSuccess, onFailure);
});