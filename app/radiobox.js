var radioBoxApp = angular.module('radioBoxApp', []);

radioBoxApp.directive('radioBox',function(){
	
	return {
		scope:{},
		template : '<input type="radio" class="radio-inline">'
	};
});