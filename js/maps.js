 var directionsService = new google.maps.DirectionsService();
 var directionsDisplay = new google.maps.DirectionsRenderer();

 var myOptions = {
   zoom:7,
   mapTypeId: google.maps.MapTypeId.ROADMAP
 }

 var map = new google.maps.Map(document.getElementById("map"), myOptions);
 directionsDisplay.setMap(map);

 var request = {
     origin: 'allenby 8', 
     destination: 'usha 1, tel aviv',
     travelMode: google.maps.DirectionsTravelMode.TRANSIT
 };


   directionsService.route(request, function(response, status) {
      alert(document.getElementById("from");
      if (status == google.maps.DirectionsStatus.OK) {

         // Display the distance:
         document.getElementById('distance').innerHTML += 
            response.routes[0].legs[0].distance.value + " meters";

         // Display the duration:
         document.getElementById('duration').innerHTML += 
            response.routes[0].legs[0].duration.value + " seconds";

         directionsDisplay.setDirections(response);
      }
   });