var selectBoxApp = angular.module('selectBoxApp', []);

selectBoxApp.directive('selectBox', function() {
	return {
		scope:{},
		template : '<select name="Select" class="form-control">'+
		              '<option value="option-1">Option 1</option>'+
		              '<option value="option-2">Option 2</option>'+
		              '</select><br>'
	};
});