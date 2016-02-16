var textApp = angular.module('textApp',[]);

textApp.directive('textBox', function() {
	return {	
		scope: {sId:"@", modelName:"@"},
		template : '<input type="text" class="form-control" ng-model="sId.modelName">'
	};
});