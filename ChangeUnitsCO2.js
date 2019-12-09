//var bottle = 82.6;
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
    	co2Button.innerHTML = "";//"Change to </br> kg";
 		kgsDisplay = false;
 	} else{ //Change to Kilograms
		for(var i=0; i<co2List.length;i++){
  			co2List[i].innerHTML = parseFloat(co2List[i].innerHTML*0.0826).toFixed(2); //From bottles to kgs
 		}
 		for(var i=0; i<co2Images.length;i++){
  			co2Images[i].src="./images/co2Kgs.png";
 		}
    	co2Button.innerHTML = "";//"Change to </br> Bottles";
 		kgsDisplay = true;
 	}
}


function colourizeRows(){
	var greenScale = ["#0E3A0E", "#124912","#175B17","#1D721D","#248F24"]
	var table = document.getElementById("leaderboardBody");
	for (var i=0; i<table.rows.length; i++){
		table.rows[i].style.backgroundColor = greenScale[i];
	}
}