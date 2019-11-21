var bottle = 82.6;
var kgsDisplay = true;

function changeUnits(){
	var co2List   = document.getElementsByName("co2");
	var co2Images = document.getElementsByName("unitsImage");
	if(kgsDisplay){ //Change to Plastic Bottles
		for(var i=0; i<co2List.length;i++){
  			co2List[i].innerHTML = parseFloat(co2List[i].innerHTML/(bottle/1000)).toFixed(2);
 		}
 		for(var i=0; i<co2Images.length;i++){
  			co2Images[i].src="images/plasticBottleCartoon.png";
 		}
 		kgsDisplay = false;
 	} else{ //Change to Kilograms
		for(var i=0; i<co2List.length;i++){
  			co2List[i].innerHTML = parseFloat(co2List[i].innerHTML*(bottle/1000)).toFixed(2);
 		}
 		for(var i=0; i<co2Images.length;i++){
  			co2Images[i].src="images/co2Kgs.png";
 		}
 		kgsDisplay = true;
 	}
}


function colourizeRows(){
	var greenScale = ["#248f24", "#33cc33","#70db70","#adebad","#ebfaeb"]
	var table = document.getElementById("leaderboardBody");
	for (var i=0; i<table.rows.length; i++){
		table.rows[i].style.backgroundColor = greenScale[i];
	}
}