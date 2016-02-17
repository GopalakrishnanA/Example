var sectionDirectiveApp = angular.module('sectionDirectiveApp',['textApp','radioBoxApp','textAreaApp','CheckBoxApp','selectBoxApp']);


sectionDirectiveApp.directive('sectionDirective',function() 
{
	return {		
		
		restrict:'E',
		templateUrl: '../acn/Directives.html',
		scope: {
			sections:'='
				},
				controller:sectionController
	};
	
	function sectionController($scope)
	{
		console.log("page meta in controller", $scope.sections);
		console.log($scope.textValue);
	}
});