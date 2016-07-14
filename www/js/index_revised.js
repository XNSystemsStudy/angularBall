'use strict';
console.log("ios run");
/********************* angularJS **********************/
var app = angular.module('angularBall',['angularBall.directive']);
	app.controller('GlobalController',function($scope) {
		var watch;
		var option = { frequency : 100 };

		$scope.pos = { x: 100, y:100 };

		document.addEventListener('deviceready', onDeviceReady, false);

		function onDeviceReady() {
		//	window.screen.lockOrientation('portrait');
			//위 동작하지 않음. why?
			watch = navigator.accelerometer.watchAcceleration(onSuccess,onError,option);
		};

		function onError() {
			alert('onError');
		}

		function onSuccess(acceleration) {
            var xVal = acceleration.x,
				yVal = acceleration.y;
			var x = $scope.pos.x, 
				y = $scope.pos.y;
			var accel_x = parseInt(-xVal)*10,
				accel_y = parseInt(yVal)*10;
			var tmp_x = x + Number(accel_x),
				tmp_y = y + Number(accel_y);

			console.log('x = ' + tmp_x + ', y = ' + tmp_y);

			if(tmp_x < (window.innerWidth-50) && tmp_x > 20) {
				$scope.pos.x = tmp_x;
			}
			if(tmp_y < (window.innerHeight-30) && tmp_y > 10) {
				$scope.pos.y = tmp_y;
			}

			$scope.$apply();
		}
	});

var appDirective = angular.module('angularBall.directive',[]);
appDirective.directive('ngBall', function() {
	return {
		restrict : 'A',
		templateUrl : 'ball.html',
		link: function(scope, element, attrs) {
		//	scope.$watch('pos.x', listenerX, false);
		//	function listenerX(newValue, oldValue, scope) {
		//		element.css("left", newValue + "px");
		//	}
		//	scope.$watch('pos.y', listenerY, false);
		//	function listenerY(newValue, oldValue, scope) {
		//		element.css("top", newValue + "px");
		//	}

			scope.$watch('pos', listener, true);
			function listener(newValue, oldValue, scope) {
				element.css("left", newValue.x + "px");
				element.css("top", newValue.y + "px");
			}

		}
	}
});


