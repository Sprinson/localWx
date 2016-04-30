$(document).ready(function(){
	 
var url, c, f, description;
var date = new Date;


	//$("#getLocation").on("click", function(){

//Retrieving lat/lon of current location and storing them in variables.
	  if (navigator.geolocation){
	    navigator.geolocation.getCurrentPosition(function(position){
	    	var lat = position.coords.latitude;
	    	var lon = position.coords.longitude;
	    	//url to retrive JSON object from wunderground.  API key: 1c48f3eebc8ead0c
	        url = "https://api.wunderground.com/api/1c48f3eebc8ead0c/conditions/forecast/alert/q/" + lat + "," + lon + ".json";

//Picking out properties from JSON object and assigning them to variables or sending them to html
	      $.getJSON(url, function(json){
	      	c = json["current_observation"]["temp_c"];
	      	f = Math.round((1.8 * c) + 32);
	      	description = json["current_observation"]["weather"].toUpperCase();
	      	$(".display-3").html(json["current_observation"]["display_location"]["full"]);
	      	$(".lead").html(c + " &#8451 " + " | " + f + " &#8457<br>" + description + "<br> Local Time: " + date);
	      	

	      	//console.log(json["current_observation"]["full"]);

//if / else if statements to determine what picture should populate the background
	      	if(description === "CLEAR SKY"){
		      	$('body').css('background-image', 'url(images/clear.jpg)');
		      	} else if (description === "SCATTERED CLOUDS") {
		      		$('body').css('background-image', 'url(images/scattered.jpg)');
		      		document.getElementById("test").style.opacity = "0.6";
		      	} else if (description === "FEW CLOUDS"){
		      		$('body').css('background-image', 'url(images/scattered.jpg)');
		      		document.getElementById("test").style.opacity = "0.6";
		      	} else if(description === "BROKEN CLOUDS") {
		      		$('body').css('background-image', 'url(images/broken.jpg)');
		      	}else if (description === "OVERCAST CLOUDS"){
		      		$('body').css('background-image', 'url(images/overcast.jpg)');
		      	} else if (description.indexOf("SNOW") >= 0){
		      		$('body').css('background-image', 'url(images/snow.jpg)');
		      		document.getElementById("test").style.opacity = "0.8";
		      	} else if (description === "SHOWER RAIN"){
		      		$('body').css('background-image', 'url(images/rain.jpg)');
		      		document.getElementById("test").style.opacity = "0.6";

	      		
	      	} 
	     
	      });
	    });
	  } 
	  
	//});
  
  



});