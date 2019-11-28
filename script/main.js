var fromLocation = "";
var toLocation = "";
var curTransportationMode = "walking";
var transportationModes = ["walking", "bicycling", "transit", "driving"];

var LISBON = " ,Lisbon"; //add to google request to make sure it searches in Lisbon


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
    '&origin=' + fromLocation + LISBON+
    '&destination=' + toLocation + LISBON+
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
  /*
  var url = "https://maps.googleapis.com/maps/api/distancematrix/json?" +
  "&origins=" + fromLocation +
  "&destinations=" + toLocation +
  "&key=AIzaSyAHLEWwDpg-DyyJhDzehuHP39vzwicOxDg";
  $.getJSON(url, function(data) {
    console.log(data);
  });
  */
  console.log("Creating ToolTip");
  var fromInput = document.getElementById("from-input").value;
  var toInput = document.getElementById("to-input").value;

  var map = document.getElementById("map");
  var toolTip = document.createElement("div");
  toolTip.setAttribute("class","co2ToolTip");

  var co2Text = document.createElement("p");
  co2Text.innerHTML = "CO<sub>2</sub> Produced: "

  var co2Span = document.createElement("span");
  co2Span.setAttribute("name","co2");
  co2Span.innerHTML = ((fromInput.length + toInput.length)*transpCO2Factor()).toFixed(2);

  kgsDisplay = true;

  var co2Img = document.createElement("img");
  co2Img.setAttribute("name","unitsImage");
  co2Img.setAttribute("width","30px");
  co2Img.setAttribute("height","30px");
  co2Img.src ="./images/co2Kgs.png";
  co2Img.onclick = function(){changeUnits()};

  co2Button = document.createElement("button");
  co2Button.setAttribute("id", "co2Button");
  co2Button.innerHTML = "Change to </br> Bottles";
  co2Button.onclick = function(){changeUnits()};

  var span = document.createElement("span");
  span.appendChild(co2Span);
  span.appendChild(co2Img);
  span.appendChild(co2Button);

  toolTip.appendChild(co2Text);
  toolTip.appendChild(span);
  map.appendChild(toolTip);
  console.log("Created ToolTip");

}

function transpCO2Factor(){
  var index = transportationModes.indexOf(curTransportationMode);
  if(index < 2){
    return 0;
  }
  return index/30;
}

var kgsDisplay = true;

function changeUnits(){
  var co2List   = document.getElementsByName("co2");
  var co2Images = document.getElementsByName("unitsImage");
  var co2Button = document.getElementById("co2Button");
  if(kgsDisplay){ //Change to Plastic Bottles
    for(var i=0; i<co2List.length;i++){
        co2List[i].innerHTML = parseFloat(co2List[i].innerHTML/0.0826).toFixed(2); //From kgs to bottles
    }
    for(var i=0; i<co2Images.length;i++){
        co2Images[i].src="./images/plasticBottleCartoon.png";
    }
    co2Button.innerHTML = "Change to </br> KGS";
    kgsDisplay = false;
  } else{ //Change to Kilograms
    for(var i=0; i<co2List.length;i++){
        co2List[i].innerHTML = parseFloat(co2List[i].innerHTML*0.0826).toFixed(2); //From bottles to kgs
    }
    for(var i=0; i<co2Images.length;i++){
        co2Images[i].src="./images/co2Kgs.png";
    }
    co2Button.innerHTML = "Change to </br> Bottles";
    kgsDisplay = true;
  }
}