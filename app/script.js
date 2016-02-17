

var myApp = angular.module('myApp', ['sectionDirectiveApp', "acnDirectives"]);


myApp.controller('maincontroller',function($scope,$http) 
    {
	$http.get('../acn/json/DataObj.json').then(function(res) {
		$scope.pageMeta = res.data;
		$scope.myData = {};
		/*
		 * *
		 * {
		 * 	s1:{name:'ASasdf', gender:0, address:'asdfoisdafoi asdffd'},
		 *  s2:{...},
		 *  s3:{...}
		 * }
		 */
		console.log("pageMeta", $scope.pageMeta);
		
		$scope.submitClick = function()
		{
			console.log($scope.textValue);
		}
		
	});
	
});



