var textArea = angular.module('textAreaApp', []);

textArea.directive('textArea',function(){
	
	return {
		scope: {},
		template : '<span><textArea class="form-control" rows="1" cols="25"></textArea></span>'
	};
});