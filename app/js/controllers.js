'use strict';

/* Controllers */

var DotToDotCtrl = function ($scope,$http,angularFire,angularFireCollection) {
	  var usersRef = new Firebase("https://kuthuki-in.firebaseio.com/users");
	  var linesRef = new Firebase("https://kuthuki-in.firebaseio.com/lines");
	  $scope.messages = angularFireCollection(new Firebase("https://kuthuki-in.firebaseio.com/messages"),$scope.onMessage);
	  
	  $scope.users = [];
	  $scope.me = null;
	  $scope.meAdded = false;
	  
	  $scope.addMe = function () {
		  $scope.meAdded = true;
		  if(!$scope.me.color) {
			  $scope.me.color = "#000000";
		  }
		  $scope.users.push($scope.me);
	  };
	  $scope.lines = [];
	  $scope.dots = [];
	  $scope.distance = 50;
	  $scope.radius = 2;
	  
	  
	  $scope.onMessage = function (snapshot) {
		  
	  };
	  
	  $scope.mouseStart = {};
	  $scope.mouseEnd = {};
	  $scope.isMouseDown = false;
	  $scope.mouseDown = function (event) {
		  
		  if($scope.me) {
			  $scope.isMouseDown = true;
			  var offset = $('#dot-board').offset();
			  var point = {};
			  point.x = event.pageX - offset.left;
			  point.y = event.pageY - offset.top;
			  $scope.mouseStart = point;
		  }
	  };
	  
	  $scope.onMouseMove = function (event) {
		  if($scope.me && $scope.isMouseDown) {
			  var point = {};
			  var offset = $('#dot-board').offset();
			  point.x = event.pageX - offset.left;
			  point.y = event.pageY - offset.top;
			  var lineto = point;
			  $scope.lines.push({from:$scope.mouseStart,to:lineto,color:$scope.me.color});
			  $scope.mouseStart = lineto;
		  }
	  };
	  
	  $scope.initialiseDots = function () {
		  var w = 500;//$('#dot-board').width();
		  var h = 500;//$('#dot-board').height();
		  var totalDotsInARow = (w-10) / $scope.distance;
		  var totalRows = (h-10) / $scope.distance;
		  
		  var cx = 5;
		  var cy = 5;
		  
		  for (var row=0;row<totalRows;row++) {
			  for (var col=0;col<totalDotsInARow;col++) {
				  var cenx = cx + $scope.distance*col;
				  var ceny = cy + $scope.distance*row;
				  
				  var dot = {cx:cenx,cy:ceny,r:$scope.radius};
				  $scope.dots.push(dot);
			  }
		  }
	  }
	  
	  $scope.onMouseUp = function (event) {
		  if($scope.me) {
			  $scope.isMouseDown = false;
			  $scope.mouseStart = {};
		  }
	  };
	  
	  angularFire(usersRef, $scope, "users");	
	  angularFire(linesRef, $scope, "lines");
	  
	  $scope.initialiseDots ();
};
/*angular.module('myApp.controllers', []).
  controller('DotToDotCtrl', [function($scope,$http,angularFire) {
	  var usersRef = new Firebase("https://kuthuki-in.firebaseio.com/users");
	  
	  $scope.users = [];
	  $scope.me = {};
	  $scope.meAdded = false;
	  
	  $scope.addMe = function () {
		  $scope.users.push($scope.me);
	  };
	  
	  angularFire(usersRef, $scope, "users");
	  
  }])
  .controller('MyCtrl2', [function() {

  }]);*/