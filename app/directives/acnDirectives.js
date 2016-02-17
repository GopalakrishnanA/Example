/**
 * Dynamic field. Based on the given data, this directive creates input fields
 * dynamically
 */
(function() {
	angular.module("acnDirectives", []);
	angular.module("acnDirectives").directive("acnField",
			[ "$compile", "$filter", acnFieldDirective ]);
	//
	function acnFieldDirective($compile, $filter) {
		function Types() {

		}
		;

		Types.TEXT = "text";

		Types.RADIO_GROUP = "radioGroup";
		Types.CHECK_LIST = "checkList";
		Types.TEXT_AREA = "textArea";
		Types.SELECT = "select";

		function linkFn(scope, element, attrs, ngModel) {
			console.debug("linkFn is called ", scope.ngModel, scope.data);
			//
			//
			var templateStr = "<div/>";

			switch (scope.data.type) {
			case Types.TEXT:
				templateStr = '<input type="text" class="form-control" placeholder="Name"></input>';
				// <input type="input" class="form-control"
				// id="exampleInputEmail1" ng-if="f.type=='textBox'">
				break;

			case Types.RADIO_GROUP:
				templateStr = "<div>";

				var options = scope.data.options;
				for (var i = 0; i < options.length; i++) {
					templateStr += '<div class="radio">  <label>    <input type="radio" name="optionsRadios" id="options'
							+ i
							+ '" value="'
							+ options[i].value
							+ '"> '
							+ options[i].label
							+ '</label></div>';
				}
				templateStr += "</div>";
				break;

			case Types.CHECK_LIST:
				templateStr = "<div>";

				var options = scope.data.options;
				for (var i = 0; i < options.length; i++) {
					templateStr += '<div class="checkbox">  <label>    <input type="checkbox" name="checkbox" id="options'
							+ i
							+ '" value="'
							+ options[i].value
							+ '"> '
							+ options[i].label + '</label></div>';
				}
				templateStr += "</div>";
				break;

			case Types.TEXT_AREA:
				templateStr = '<textarea class="form-control" rows="3"></textarea>';
				break;

			case Types.SELECT:
				var options = scope.data.options;
				if (!options)
					throw new Error(
							"Boss, please specify 'options' in your field definition");

				templateStr = '<div class="form-group">'
						+ '<select class="form-control">';

				for (var i = 0; i < options.length; i++) {

					templateStr += '<option value="' + options[i].value + '">'
							+ options[i].label + '</option>';
				}

				templateStr += "</select></div>";
				console.log(templateStr);
			}

			element.html(templateStr).show();

			var uiElem;
			var uiElemForMultiOptions = [];

			// Write code to manage ngModel
			if (ngModel) {
				// Specify how UI should be updated
				ngModel.$render = function() {
					console.debug("$render function is called",
							ngModel.$viewValue);
					//
					switch (scope.data.type) {
					case Types.TEXT:
						uiElem = element.find("input");
						uiElem.html($sce.getTrustedHtml(ngModel.$viewValue
								|| ''));
						console.log(uiElem);
						break;
					case Types.TEXT_AREA:
						uiElem = element.find("textarea");
						uiElem.val($sce
								.getTrustedHtml(ngModel.$viewValue || ''));
						break;
					case Types.RADIO_GROUP:
						var val = $sce.getTrustedHtml(ngModel.$viewValue || '');
						uiElem = element.find("input[type='radio', value='"+val+"']");
						uiElem.attr("checked", true);
						break;

					case Types.CHECK_LIST:
						uiElem = element.find("input");
						uiElem.val($sce
								.getTrustedHtml(ngModel.$viewValue || ''));
						break;

					case Types.SELECT:
						uiElem = element.find("select");
						uiElem.val($sce
								.getTrustedHtml(ngModel.$viewValue || ''));
						break;

					}
				};

				// Listen for change events to enable binding
				element.on('blur keyup change', function() {
					scope.$evalAsync(read);
				});
				//
				read(); // initialize

				// Write data to the model
				function read() {
					var val;
					var multiVal = [];
					switch (scope.data.type) {
					case Types.TEXT:
						uiElem = element.find("input");
						val = uiElem.val();
						break;
					case Types.TEXT_AREA:
						uiElem = element.find("textarea");
						val = uiElem.val();
						break;
					case Types.RADIO_GROUP:
						uiElem = element.find("input[type='radio']:checked");
						var sel = uiElem.val();
						var r = $filter("filter")(scope.data.options, sel);
						val = r ? r[0] : null;
						break;
					case Types.CHECK_LIST:
						uiElemForMultiOptions = element.find("input[type='checkbox']:checked");
						multiVal =[];
						for(var uiElemForMultiOptionsIndex = 0; uiElemForMultiOptionsIndex < uiElemForMultiOptions.length; uiElemForMultiOptionsIndex++)
						{
							var sel = angular.element(uiElemForMultiOptions[uiElemForMultiOptionsIndex]).val();							
							var r = $filter("filter")(scope.data.options, sel);							
							multiVal.push(uiElemForMultiOptionsIndex, r ? r : null);
						}
//						uiElem = element.find("input");
//						val = uiElem.val();
						
						break;
					case Types.SELECT:
						uiElem = element.find("select option:selected");
						val = uiElem.text();
						console.log(val);
						break;
					default:
						console
								.warn("Can not read the value ",
										scope.data.type);
						break;
					}
					// When we clear the content editable the browser leaves a
					// <br> behind
					// If strip-br attribute is provided then we strip this out
					if (attrs.stripBr && val == '<br>') {
						val = '';
					}
					if(val)
						{
					ngModel.$setViewValue(val);
						}
					else {
						ngModel.$setViewValue(multiVal);
					}
				}
			}

			$compile(element.contents())(scope);
		}
		//
		//
		// Create controller
		function DirController($scope, $sce) {
			console.log("Ctrl is created ", $scope.data);
			$scope.onTextChange = function() {
				// console.log('text is being changed', arguments);
			}
		}
		//
		var dir = {
			link : linkFn,
			scope : {
				data : "="
			},
			require : "?ngModel",
			controller : [ "$scope", "$sce", DirController ]
		};
		return dir;
	}
})();
