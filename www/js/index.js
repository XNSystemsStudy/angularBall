'use strict';
console.log("ios run");
/********************* angularJS **********************/
var app = angular.module('angularBall',['angularBall.directive']);
	app.controller('GlobalController',function($scope) {
		var watch;
		var option = { frequency : 100 };

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
			$scope.move(acceleration.x, acceleration.y);
		}
	});

var appDirective = angular.module('angularBall.directive',[]);
appDirective.directive('ngBall', function() {
	return {
		restrict : 'A',
		templateUrl : 'ball.html',
		link: function(scope, element, attrs) {
			scope.move = function(xVal,yVal) {
				var x = element[0].style.left,
					y = element[0].style.top;
				x = x.split("px");
				y = y.split("px");

				var accel_x = parseInt(-xVal)*10,
					accel_y = parseInt(yVal)*10;
				var tmp_x = (Number(x[0]) + Number(accel_x)),
					tmp_y = (Number(y[0]) + Number(accel_y));

				if(tmp_x < (window.innerWidth-50) && tmp_x > 20) {
					tmp_x = tmp_x + "px";
					element.css("left",tmp_x);	
				}

				if(tmp_y < (window.innerHeight-30) && tmp_y > 10) {
					tmp_y = tmp_y + "px";
					element.css("top",tmp_y);
				}
			}
		}
	}
});


