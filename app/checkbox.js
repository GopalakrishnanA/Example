var checkboxApp = angular.module('CheckBoxApp', []);
checkboxApp.directive('checkBox',function(){
	
	return {
		scope: {},
		template : '<input type="checkbox">'
	};
});