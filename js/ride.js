
(function() {
   var rideController = function($scope) {
      this.rides = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}];
   
      this.addRide = function() {
        alert(this.From+' '+this.To);
        //$scope.todos.push({text:$scope.todoText, done:false});
        //$scope.todoText = '';
      };
   
      this.remaining = function() {
        var count = 0;
        angular.forEach(this.rides, function(rides) {
          count += ride.done ? 0 : 1;
        });
        return count;
      };
   
      this.archive = function() {
        var oldTodos = this.rides;
        this.rides = [];
        angular.forEach(oldRides, function(ride) {
          if (!ride.done) this.rides.push(ride);
        });
      };
    };


  var rideInfoService = function () {


    var rideInfo = {
        getRideOptions : function() {
          return [{


          }];


        }

    };

    return rideInfo;


  };



  var rideApp = arideInfoService = angular.module('rideApp', []);

  rideApp.controller('rideController', ['$scope', rideController]);
  rideApp.factory('RideInfoService', rideInfoService);
})();

