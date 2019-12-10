//var bottle = 82.6;
var kgsDisplay = true;

function changeUnits() {
    var co2List = document.getElementsByName("co2");
    var co2Button = document.getElementById("co2Button");
    var co2measurement = document.getElementsByName("measurement");
    if (kgsDisplay) { //Change to Plastic Bottles
        for (var i = 0; i < co2List.length; i++) {
            co2List[i].innerHTML = parseFloat(co2List[i].innerHTML / 0.0826).toFixed(2); //From kgs to bottles
        }
        for (var i = 0; i < co2measurement.length; i++) {
            co2measurement[i].innerHTML = "bottles"; //From kgs to bottles
        }
        co2Button.innerHTML = "Measurement: bottles"; //"Change to </br> kg";
        kgsDisplay = false;
    } else { //Change to Kilograms
        for (var i = 0; i < co2List.length; i++) {
            co2List[i].innerHTML = parseFloat(co2List[i].innerHTML * 0.0826).toFixed(2); //From bottles to kgs
        }
        for (var i = 0; i < co2measurement.length; i++) {
            co2measurement[i].innerHTML = "CO<sub>2</sub>/kg"; //From kgs to bottles
        }
        co2Button.innerHTML = "Measurement: CO<sub>2</sub>/kg"; //"Change to </br> Bottles";
        kgsDisplay = true;
    }
}