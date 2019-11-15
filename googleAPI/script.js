var route;

function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 38.73, lng: -9.14}
  });
  directionsRenderer.setMap(map);

  var onChangeHandler = function() {
    if(document.getElementById('start').value != "none" && document.getElementById('end').value != "none" /*&& document.getElementById('type').value != "none"*/)
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
  //document.getElementById('type').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  route = {
        origin: {query: document.getElementById('start').value},
        destination: {query: document.getElementById('end').value},
        travelMode:"DRIVING" //Only works if you pass it as a string here
        //travelMode: {query: document.getElementById('type').value} //Can't put it working if you pass it as the value of a select
      }
  directionsService.route(route
      ,
      function(response, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
}