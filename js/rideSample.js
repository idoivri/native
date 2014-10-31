  
    /*
      Assumes a ride object (dictionary) which contains: 
        "type"     | ride type: car, bus, taxi, walk, bicycle
        "time"     | time in minutes
        "distance"   | distance in KMs
        "pollutants" | co2 emmisions in grams
        "cost"     | cost in NIS
        "title"    | name of road, transportation name, etc
    */
 
    function displayRide(ride) {
        var message = ride.from + " " + ride.to + " " + ride.type + " " +  ride.time + " " +  ride.distance + " " + ride.pollutants + " " + ride.cost + " "+ride.title;
        alert(message);
    };

    function createRide(to,from,type,time,distance,pollutants,cost,title) {
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
    };

      //calculate the calories by the ride's parameters
      function calculateCalories(ride){
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
      };

        //calculate the calories by the ride's parameters
      function calculatePollutants(ride){

      };    

   
      /*
    <!-- main -->
    
      ride1 = createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","car",20,50,200,300,"");
      //ride2 = createRide("dizngoff 99, tel aviv","rashi 25, tel aviv","bus",100,20,250,210,"abc");
      //ride3 = createRide("Allenby 5, Tel Aviv","rashi 25, tel aviv","walk",100,20,250,210,"abc");
      ride2 = createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","walk",40,80,100,600,"");
      ride3 = createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","bus",110,230,50,400,"");
      ride4 = createRide("usha 1, tel Aviv","uri tzvi greenberg 8, Tel Aviv","bicycle",123,456,10,30,"");
      rides = [ride1,ride2,ride3,ride4];

    */