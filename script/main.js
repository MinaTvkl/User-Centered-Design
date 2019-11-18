function changeGoButtonOnUserInput() {
  var fromInput = document.getElementById("from-input");
  var toInput = document.getElementById("to-input");

  var predetermined = document.getElementsByClassName("predetermined")[0];
  var searchRoute = document.getElementsByClassName("search-route")[0];

  if (fromInput && fromInput.value && toInput && toInput.value) {
    if (fromInput)
      predetermined.classList.add("hidden");
    searchRoute.classList.remove("hidden");
  } else {
    predetermined.classList.remove("hidden");
    searchRoute.classList.add("hidden");
  }
}

var divs = ["Home", "GoHome", "GoToWork"]; // changed to 2
var visibleDivId = null;

function toggleVisibility(divId) {
  if (visibleDivId === divId) {
    //visibleDivId = null;
  } else {
    visibleDivId = divId;
  }
  hideNonVisibleDivs();
}

function hideNonVisibleDivs() {
  var i, divId, div;
  for (i = 0; i < divs.length; i++) {
    divId = divs[i];
    div = document.getElementById(divId);
    if (visibleDivId === divId) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  }
}
