
(function() {
   var rideController = function($scope, RidesInfoService, $window) {
 
      this.rideOptions =[];
      
      this.addRide = function() {
        //alert(this.From+' '+this.To);
        //$scope.todos.push({text:$scope.todoText, done:false});
        //$scope.todoText = '';
        this.From='Tel Aviv Herzel 100';
        this.To = 'Ibn Gvirol 8, Tel Aviv';

        var rideOptions = RidesInfoService.mockRidesOptionsRealistic();
        console.log(rideOptions);

        this.rideOptions = rideOptions;

        $window.scrollTo(2500,0);

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
        //console.log(this.From + this.To);
        //console.log(RidesInfoService.getRidesOptions(this.From, this.To));
        console.log(RidesInfoService.mockRidesOptions());
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

    createRide: function(to,from,type,time,distance,cost,pollutants,title) {
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

      mockRidesOptionsRealistic:function() {
        var ride1 = rideInfo.createRide("Ibn Gvirol 8, Tel Aviv","Tel Aviv Herzel 100","walk",4732,6164,0,0,"");
        var ride4 = rideInfo.createRide("Ibn Gvirol 8, Tel Aviv","Tel Aviv Herzel 100","drive",853,6800,18.94,1842.8,"");
        var ride3 = rideInfo.createRide("Ibn Gvirol 8, Tel Aviv","Tel Aviv Herzel 100","bus",1609,6423,6.6,648.723,"");
        var ride2 = rideInfo.createRide("Ibn Gvirol 8, Tel Aviv","Tel Aviv Herzel 100","bicycle",1577,6164,3,128.1,"");
        
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

 

         console.log(request);

          directionsService.route(request, function(response, status) {
         //    //alert(document.getElementById("from");
            console.log('is ok ?' + status);
             if (status == google.maps.DirectionsStatus.OK) {

         //       // Display the distance:
         //       document.getElementById('distance').innerHTML += 
                  var distance = response.routes[0].legs[0].distance.value;

         //       // Display the duration:
         //       document.getElementById('duration').innerHTML += 
                  var time = response.routes[0].legs[0].duration.value;



                  console.log(response);

                  var ride = rideInfo.createRide(To,From,transMethod,time,distance,null,null,null);
                  console.log('created ride');
                  console.log(ride);
                  console.log('queryGoogleRide method at rideInfo service return');

                  return ride;
             }
             console.log('google failed misearably to recommend a ride');
             return null;
          });

      },


      getRidesOptions : function(From, To) {
        console.log('getRideOptions method at rideInfo service started');

        var calculation = function(walk, car, bus, taxi, uber, bike) {

          walk.calories=walk.time/60*4.4;
          walk.cost=0;
          walk.pollutants=0;

          //CAR:
          car.calories=0;
          car.pollutants=car.distance/1000*271;
          car.cost=car.distance/1000*2.738;

          //BUS:
          bus.calories=44; //TODO: FIX - 10 minutes walking
          bus.pollutants=bus.distance/1000*109;
          bus.cost=6.60;

          //TAXI
          taxi.calories=0;
          taxi.pollutants=taxi.distance/1000*271;
          taxi.cost=12.3+taxi.time/10*0.3;

          //UBER
          uber.calories=0;
          uber.pollutants=uber.distance/1000*271;
          uber.cost=10.3+uber.time/10*0.2;

          //BIKE
          bike.pollutants=bike.distance/1000*21;
          bike.time=bike.time/3;
          bike.calories=bike.time/3600*567;
          bike.cost=0;

          return [bus, car, walk, uber, taxi, bike];

        }

        var results = function(From, To, calculation) {


          var bus = rideInfo.queryGoogleRide(From, To, 'TRANSIT');
          var car = rideInfo.queryGoogleRide(From, To, 'DRIVING');
          var walk = rideInfo.queryGoogleRide(From, To, 'WALKING');
          var taxi = rideInfo.queryGoogleRide(From, To, 'DRIVING');
          var uber = rideInfo.queryGoogleRide(From, To, 'DRIVING');
          var bike = rideInfo.queryGoogleRide(From, To, 'WALKING');

          return calculation(walk, car, bus, taxi, uber, bike);


        }

        results(From, To, calculation);

        console.log(results(From, To, calculation));
        //WALKING:
 




        console.log('getRideOptions method at rideInfo service return');



        }

    };

    return rideInfo;


  };



  var rideApp = arideInfoService = angular.module('rideApp', []);

  rideApp.controller('rideController', ['$scope', 'RidesInfoService','$window', rideController]);
  rideApp.factory('RidesInfoService', ridesInfoService);
})();

