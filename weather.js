$(document).ready(function(){
	 
var url, urlOpen, c, f, description, sunset, sunrise;
var date = new Date;
var currHour = date.getHours();


	//$("#getLocation").on("click", function(){

//Retrieving lat/lon of current location and storing them in variables.
	  if (navigator.geolocation){
	    navigator.geolocation.getCurrentPosition(function(position){
	    	var lat = position.coords.latitude;
	    	var lon = position.coords.longitude;
	    	//url to retrive JSON object from wunderground.  API key: 1c48f3eebc8ead0c
	        url = "https://api.wunderground.com/api/1c48f3eebc8ead0c/conditions/astronomy/forecast/alert/q/" + lat + "," + lon + ".json";
	        urlOpen = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&mode=json&units=metric&APPID=0531039e1fb1d6ebe80315823a3cccc3";
//Picking out properties from JSON object and assigning them to variables or sending them to html
	      $.getJSON(url, function(json){
	      	c = json["current_observation"]["temp_c"];
	      	f = Math.round((1.8 * c) + 32);
	      	description = json["current_observation"]["weather"].toUpperCase();
	      	sunset = json["moon_phase"]["sunset"]["hour"];
	      	sunrise = json["moon_phase"]["sunrise"]["hour"];
	      	$(".display-3").html(json["current_observation"]["display_location"]["full"]);
	      	$(".lead").html(c + " &#8451 " + " | " + f + " &#8457<br>" + description + "<br> Local Time: " + date);
	      	//currHour = date.substr(17, 2);
	      	console.log(currHour);


	      	//console.log(json["current_observation"]["full"]);

//if / else if statements to determine what picture should populate the background
	      	if(description === "CLEAR"){
		      	$('body').css('background-image', 'url(images/clear.jpg)');
		      	} else if (description.indexOf("SCATTERED") >= 0 || description.indexOf("PARTLY") >= 0 ) {
		      		$('body').css('background-image', 'url(images/scattered.jpg)');
		      		document.getElementById("test").style.opacity = "0.6";
		      	} else if(description.indexOf("MOSTLY") >= 0) {
		      		$('body').css('background-image', 'url(images/broken.jpg)');
		      	}else if (description === "OVERCAST"){
		      		$('body').css('background-image', 'url(images/overcast.jpg)');
		      	} else if (description.indexOf("THUNDERSTORM") >= 0 || description.indexOf("HAIL") >= 0){
		      		$('body').css('background-image', 'url(images/thunderstorm.jpg)');
		      		document.getElementById("test").style.opacity = "0.8";
		      	} else if (description.indexOf("SNOW") >= 0){
		      		$('body').css('background-image', 'url(images/snow.jpg)');
		      		document.getElementById("test").style.opacity = "0.8";
		      	} else if (description.indexOf("RAIN") >= 0 || description.indexOf("DRIZZLE") >= 0){
		      		$('body').css('background-image', 'url(images/rain.jpg)');
		      		document.getElementById("test").style.opacity = "0.6";
		      	}  else if (description.indexOf("FOG") >= 0 || description.indexOf("MIST") >= 0){
		      		$('body').css('background-image', 'url(images/fog.jpg)');
		      	} else if (description.indexOf("SMOKE") >= 0 || description.indexOf("HAZE") >= 0){
		      		$('body').css('background-image', 'url(images/haze.jpg)');
		      	} else if (description.indexOf("VOLCANIC") >= 0){
		      		$('body').css('background-image', 'url(images/volcano.jpg)');
		      	} else if (description.indexOf("SAND") >= 0 || description.indexOf("DUST") >= 0){
		      		$('body').css('background-image', 'url(images/sand.jpg)');
		      	}
	      	}); 
	    });
	  } else {
	  	alert("Your browser does not support this.");
	  }
	     
	      
	    
	  
	  
	//});
  
  



});