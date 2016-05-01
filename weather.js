$(document).ready(function(){
	 
var url, urlOpen, c, f, description, sunset, sunrise;
var date = new Date;
var currHour = (date.getHours() * 100) + date.getMinutes();


	//$("#getLocation").on("click", function(){

//Retrieving lat/lon of current location and storing them in variables.
	  if (navigator.geolocation){
	    navigator.geolocation.getCurrentPosition(function(position){
	    	var lat = position.coords.latitude;
	    	var lon = position.coords.longitude;
	    	//url to retrive JSON object from wunderground.  API key: 1c48f3eebc8ead0c
	        url = "https://api.wunderground.com/api/1c48f3eebc8ead0c/conditions/astronomy/forecast/alert/q/" + lat + "," + lon + ".json";
			
		  //Picking out properties from wunderground JSON object and assigning them to variables.
	      $.getJSON(url, function(json){
	      	c = json["current_observation"]["temp_c"];
	      	f = Math.round((1.8 * c) + 32);
	      	description = json["current_observation"]["weather"].toUpperCase();
	      	sunset = json["moon_phase"]["sunset"]["hour"] + json["moon_phase"]["sunset"]["minute"];
	      	sunrise = json["moon_phase"]["sunrise"]["hour"] + json["moon_phase"]["sunrise"]["minute"];
			$(".display-3").html(json["current_observation"]["display_location"]["full"]);
	      	$(".lead").html(c + " &#8451 " + " | " + f + " &#8457<br>" + description + "<br> Local Time: " + date);
	      	
	      	
	      	//Function to determine 'weather' or not it is day or night.
	      	function dayNight(){
	      		if (currHour < sunset && currHour > sunrise){
	      			return true;
	      		} else {
	      			return false;
	      		}
	      	}
	      	
			//[if else if] statements to determine what picture should populate the background
      		if(description === "CLEAR" && dayNight()){
	      		$('body').css('background-image', 'url(images/clear.jpg)');
	      	} 
	      	else if(description === "CLEAR" && !dayNight()){
	      		$('body').css('background-image', 'url(images/clearNight.jpg)');
	      	} 
	      	else if (dayNight() && description.indexOf("SCATTERED") >= 0 || description.indexOf("PARTLY") >= 0) {
	      		$('body').css('background-image', 'url(images/scattered.jpg)');
	      		document.getElementById("test").style.opacity = "0.6";
	      	}
	      	else if (description.indexOf("SCATTERED") >= 0 || description.indexOf("PARTLY") >= 0 && !dayNight() ) {
	      		$('body').css('background-image', 'url(images/scatteredNight.jpg)');
	      	}
	      	else if(description.indexOf("MOSTLY") >= 0 && dayNight()) {
	      		$('body').css('background-image', 'url(images/broken.jpg)');
	      	}
	      	else if(description.indexOf("MOSTLY") >= 0 && !dayNight()) {
	      		$('body').css('background-image', 'url(images/brokenNight.jpg)');
	      	}
	      	else if (description === "OVERCAST" && dayNight()){
	      		$('body').css('background-image', 'url(images/overcast.jpg)');
	      	}
	      	else if (dayNight() && description.indexOf("THUNDERSTORM") >= 0 || description.indexOf("HAIL") >= 0){
	      		$('body').css('background-image', 'url(images/thunderstorm.jpg)');
	      		document.getElementById("test").style.opacity = "0.7";
	      	}
	      	else if (description.indexOf("THUNDERSTORM") >= 0 || description.indexOf("HAIL") >= 0 && !dayNight()){
	      		$('body').css('background-image', 'url(images/thunderstormNight.jpg)');
	      	}
	      	else if (description.indexOf("SNOW") >= 0 && dayNight()){
	      		$('body').css('background-image', 'url(images/snow.jpg)');
	      		document.getElementById("test").style.opacity = "0.8";
	      	}
	      	else if (description.indexOf("SNOW") >= 0 && !dayNight()){
	      		$('body').css('background-image', 'url(images/snowNight.jpg)');
	      		document.getElementById("test").style.opacity = "0.5";
	      	}
	      	else if (dayNight() && description.indexOf("RAIN") >= 0 || description.indexOf("DRIZZLE") >= 0){
	      		$('body').css('background-image', 'url(images/rain.jpg)');
	      		document.getElementById("test").style.opacity = "0.6";
	      	}
	      	else if (description.indexOf("RAIN") >= 0 || description.indexOf("DRIZZLE") >= 0 && !dayNight()){
	      		$('body').css('background-image', 'url(images/rainNight.jpg)');
	      	}
	      	else if (dayNight() && description.indexOf("FOG") >= 0 || description.indexOf("MIST") >= 0){
	      		$('body').css('background-image', 'url(images/fog.jpg)');
	      	}
	      	else if (dayNight() && description.indexOf("SMOKE") >= 0 || description.indexOf("HAZE") >= 0){
	      		$('body').css('background-image', 'url(images/haze.jpg)');
	      	}
	      	else if (description.indexOf("VOLCANIC") >= 0){
	      		$('body').css('background-image', 'url(images/volcano.jpg)');
	      		document.getElementById("test").style.opacity = "0.5";
	      	}
	      	else if (dayNight() && description.indexOf("SAND") >= 0 || description.indexOf("DUST") >= 0){
	      		$('body').css('background-image', 'url(images/sand.jpg)');
	      	}
	      	else if (!dayNight() && description === "OVERCAST" || description.indexOf("MIST") >= 0 || description.indexOf("HAZE") >=0 || description.indexOf("DUST") >=0 || description.indexOf("SAND") >=0 || description.indexOf("SMOKE") >=0 || description.indexOf("FOG") >=0){
	      		$('body').css('background-image', 'url(images/hazeNight.jpg)');
	      	}
      	}); 
    });
  } else {
  	alert("Your browser does not support this.");
  }
     
	      
	    
	  
	  
	//});
});