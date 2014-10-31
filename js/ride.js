
(function() {
   var rideController = function($scope, RidesInfoService) {
      this.rides = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}];
      
      this.addRide = function() {
        //alert(this.From+' '+this.To);
        //$scope.todos.push({text:$scope.todoText, done:false});
        //$scope.todoText = '';
        console.log(this.getRidesOptions());

      };


      this.getRidesOptions = function() {


        //  var directionsDisplay = new google.maps.DirectionsRenderer();

        //  var myOptions = {
        //    zoom:7,
        //    mapTypeId: google.maps.MapTypeId.ROADMAP
        //  }

        // console.log(document.getElementById("map"));
        // var map = new google.maps.Map(document.getElementById("map"), myOptions);
        // directionsDisplay.setMap(map);

        // directionsDisplay.setDirections(response);
        console.log(this.From + this.To);
        console.log(RidesInfoService.getRidesOptions(this.From, this.To));

        //return RidesInfoService.mockRidesOptions();
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

      queryGoogleRide : function(From, To, transMethod) {
          console.log('queryGoogleRide method at rideInfo service started');

          var directionsService = new google.maps.DirectionsService();

          var request = {
             origin: From, 
             destination: To,
             travelMode: google.maps.DirectionsTravelMode[transMethod]  // google.maps.DirectionsTravelMode.TRANSIT
         };

         request = {
             origin: From, 
             destination: To,
             travelMode: google.maps.DirectionsTravelMode.TRANSIT  // google.maps.DirectionsTravelMode.TRANSIT
         };


         console.log(request);

          directionsService.route(request, function(response, status) {
         //    //alert(document.getElementById("from");
             if (status == google.maps.DirectionsStatus.OK) {

         //       // Display the distance:
         //       document.getElementById('distance').innerHTML += 
                  var distance = response.routes[0].legs[0].distance.value;

         //       // Display the duration:
         //       document.getElementById('duration').innerHTML += 
                  var time = response.routes[0].legs[0].duration.value;



                  console.log(response);

                  var ride = rideInfo.createRide(To,From,transMethod,time,distance,null,null,null);

                  console.log('queryGoogleRide method at rideInfo service return');

                  return ride;
             }
             console.log('google failed misearably to recommend a ride');
             return null;
          });

      },


      getRidesOptions : function(From, To) {
        console.log('getRideOptions method at rideInfo service started');

        var bus = rideInfo.queryGoogleRide(From, To, 'TRANSIT');
        var car = rideInfo.queryGoogleRide(From, To, 'DRIVING');
        var walk = rideInfo.queryGoogleRide(From, To, 'WALKING');
        var taxi = rideInfo.queryGoogleRide(From, To, 'DRIVING');
        var uber = rideInfo.queryGoogleRide(From, To, 'DRIVING');
        var bike = rideInfo.queryGoogleRide(From, To, 'WALKING');

        console.log('getRideOptions method at rideInfo service return');

          return [bus, car, walk, uber, taxi, bike];


        }

    };

    return rideInfo;


  };



  var rideApp = arideInfoService = angular.module('rideApp', []);

  rideApp.controller('rideController', ['$scope', 'RidesInfoService', rideController]);
  rideApp.factory('RidesInfoService', ridesInfoService);
})();

