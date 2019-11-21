var fromLocation = "";
var toLocation = "";
var curTransportationMode = "walking";
var transportationModes = ["walking", "bicycling", "transit", "driving"];

window.onload = function(e) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("No permission to retrieve current location, please select location manually.")
    return;
  }
}

function setActiveTransportationMode(currentMode) {
  curTransportationMode = currentMode;
  transportationModes.forEach(cur => {
    if (cur == currentMode) {
      if (!document.getElementById(cur).classList.contains("active")) {
        document.getElementById(cur).classList.add("active");
      }
    } else {
      if (document.getElementById(cur).classList.contains("active")) {
        document.getElementById(cur).classList.remove("active");
      }
    }
  });
  travelRoute();
}

function updateTravelButton() {
  showTravelButton();
  var fromInput = document.getElementById("from-input");
  var toInput = document.getElementById("to-input");

  var travelButton = document.getElementById("travel-button");

  if (fromInput && toInput && fromInput.value && toInput.value) {
    //If both have input
    if (travelButton.classList.contains("grey")) {
      //If button is grey, set button to green
      travelButton.classList.remove("grey");
      travelButton.classList.add("green");
    } else if (travelButton.classList.contains("green")) {
      //If button is green, do nothing
    }
  } else {
    //If not both have input
    if (travelButton.classList.contains("grey")) {
      //If button is grey do nothing
    } else if (travelButton.classList.contains("green")) {
      //If button is green, set button to grey
      travelButton.classList.remove("green")
      travelButton.classList.add("grey");
    }
  }
}

function setFrom(location) {
  var fromInput = document.getElementById("from-input");
  switch (location) {
    case "current-location":
      fromInput.value = "Current location";
      updateTravelButton();
      break
    default:
      fromInput.value = "";
      break
  }
}

function setTo(location) {
  var toInput = document.getElementById("to-input");
  switch (location) {
    case "predetermined-home":
      toInput.value = "LX Factory";
      updateTravelButton();
      break
    case "predetermined-work":
      toInput.value = "Tecnico";
      updateTravelButton();
      break
    default:
      fromInput.value = "";
      break
  }
}

function travelRoute() {
  console.log("Travelling");
  var fromInput = document.getElementById("from-input");
  var toInput = document.getElementById("to-input");

  if (toInput.value) {
    toLocation = toInput.value;
  }

  switch (fromInput.value) {
    case "Current location":
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("No permission to retrieve current location, please select location manually.")
        return;
      }
      break
    default:
      if (fromInput.value) {
        fromLocation = fromInput.value
      }
      break
  }

  console.log("From location: " + fromLocation);
  console.log("To location: " + toLocation);

  calculateCO2();
  showRoute();
  showTransportationModeOptions();
}

function showPosition(position) {
  fromLocation = position.coords.latitude + "," + position.coords.longitude;
}

function showRoute() {
  var mapDiv = document.getElementById("map");

  mapDiv.innerHTML = '<iframe frameborder="0" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyAHLEWwDpg-DyyJhDzehuHP39vzwicOxDg' +
    '&origin=' + fromLocation +
    '&destination=' + toLocation +
    '&mode=' + curTransportationMode + '" allowfullscreen> < /iframe > ';
}

function showTransportationModeOptions() {
  var searchRoute = document.getElementById("search-route");
  var showTransportationOptions = document.getElementById("travel-options");

  if (!searchRoute.classList.contains("hidden")) {
    searchRoute.classList.add("hidden");
  }
  if (showTransportationOptions.classList.contains("hidden")){
    showTransportationOptions.classList.remove("hidden");
  }
}

function showTravelButton() {
  var searchRoute = document.getElementById("search-route");
  var showTransportationOptions = document.getElementById("travel-options");

  if (!showTransportationOptions.classList.contains("hidden")){
    showTransportationOptions.classList.add("hidden");
  }
  if (searchRoute.classList.contains("hidden")) {
    searchRoute.classList.remove("hidden");
  }
}

function calculateCO2() {
  var url = "https://maps.googleapis.com/maps/api/distancematrix/json?" +
  "&origins=" + fromLocation +
  "&destinations=" + toLocation +
  "&key=AIzaSyAHLEWwDpg-DyyJhDzehuHP39vzwicOxDg";
  $.getJSON(url, function(data) {
    console.log(data);
  });
}
