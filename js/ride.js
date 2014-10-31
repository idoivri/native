
(function() {
   var rideController = function($scope, RidesInfoService) {
      this.rides = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}];
      
      this.addRide = function() {
        alert(this.From+' '+this.To);
        //$scope.todos.push({text:$scope.todoText, done:false});
        //$scope.todoText = '';
        console.log(this.getRidesOptions());

      };


      this.getRidesOptions = function() {

        return RidesInfoService.mockRidesOptions();
        //return RidesInfoService.createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","car",20,50,200,300,"");
      }
   
      // this.remaining = function() {
      //   var count = 0;
      //   angular.forEach(this.rides, function(rides) {
      //     count += ride.done ? 0 : 1;  
      //   });
      //   return count;
      // };
   
      // this.archive = function() {
      //   var oldTodos = this.rides;
      //   this.rides = [];
      //   angular.forEach(oldRides, function(ride) {
      //     if (!ride.done) this.rides.push(ride);
      //   });
      // };

    };


  var ridesInfoService = function () {


    var rideInfo = {



    /*
      Assumes a ride object (dictionary) which contains: 
        "type"     | ride type: car, bus, taxi, walk, bicycle
        "time"     | time in minutes
        "distance"   | distance in KMs
        "pollutants" | co2 emmisions in grams
        "cost"     | cost in NIS
        "title"    | name of road, transportation name, etc
    */
 
    displayRide: function(ride) {
        var message = ride.from + " " + ride.to + " " + ride.type + " " +  ride.time + " " +  ride.distance + " " + ride.pollutants + " " + ride.cost + " "+ride.title;
    },

    createRide: function(to,from,type,time,distance,pollutants,cost,title) {
      var obj = [];
      obj["to"]=to;
      obj["from"]=from;
      obj["type"]=type;
      obj["time"]=time;
      obj["distance"]=distance;
      obj["pollutants"]=pollutants;
      obj["cost"]=cost;
      obj["title"]=title;
      return obj;
    },

      //calculate the calories by the ride's parameters
      calculateCalories:function(ride){
        if (!ride.time || 0 === ride.time.length);
        {
          console.log("calculateCalories(ride):EMPTY DISTANCE!");
        }
        switch (ride["type"]) 
        {
        case "car":
        case "taxi":
        case "bus":
          ride.calories=0;
        case "walk":
          ride.calories=ride.time.length*4.4;
        case "bike":
          ride.calories=ride.distance.length*567/60;

        default:
          console.log("calculateCalories(ride):WRONG RIDE TYPE!");
        };
      },

        //calculate the calories by the ride's parameters
      calculatePollutants:function(ride){

      },    

   
      
      mockRidesOptions:function() {
    
        var ride1 = rideInfo.createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","car",20,50,200,300,"");
        //ride2 = createRide("dizngoff 99, tel aviv","rashi 25, tel aviv","bus",100,20,250,210,"abc");
        //ride3 = createRide("Allenby 5, Tel Aviv","rashi 25, tel aviv","walk",100,20,250,210,"abc");
        var ride2 = rideInfo.createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","walk",40,80,100,600,"");
        var ride3 = rideInfo.createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","bus",110,230,50,400,"");
        var ride4 = rideInfo.createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","bicycle",123,456,10,30,"");
        var rides = [ride1,ride2,ride3,ride4];

        return rides;
      },

    
      getRidesOptions : function() {
          return [{




          }]


        }

    };

    return rideInfo;


  };



  var rideApp = arideInfoService = angular.module('rideApp', []);

  rideApp.controller('rideController', ['$scope', 'RidesInfoService', rideController]);
  rideApp.factory('RidesInfoService', ridesInfoService);
})();

