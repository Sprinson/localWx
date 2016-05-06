
$(document).ready(function(){

	var url, c, f, description, sunset, sunrise, icon, zipCode;
	var date = new Date;
	var currHour = (date.getHours() * 100) + date.getMinutes();
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); 
//Retrieving lat/lon of current location and storing them in variables.

	   
	
		function getWeather(){
		  	$.getJSON(url, function(json){
		  		c = json["current_observation"]["temp_c"];
		  		f = Math.round((1.8 * c) + 32);
		  		description = json["current_observation"]["weather"].toUpperCase();
		  		sunset = json["moon_phase"]["sunset"]["hour"] + json["moon_phase"]["sunset"]["minute"];
		  		sunrise = json["moon_phase"]["sunrise"]["hour"] + json["moon_phase"]["sunrise"]["minute"];
		  		icon = json["current_observation"]["icon_url"];
		  		$(".display-3").html(json["current_observation"]["display_location"]["full"]);
		  		$(".lead").html(c + " &#8451 " + " | " + f + " &#8457<br>" + description + "<br> Local Time: " + date + "<img src ="+icon+">");		  		

		      	//Function to determine 'weather' or not it is day or night.
		      	function dayNight(){
		      		if (currHour < sunset && currHour > sunrise){
		      			return true;
		      		} else {
		      			return false;
		      		}
		      	}
		      	
				//[if else if] statements to determine what picture should populate the background and opactiy for the jumbotron.
				if(description === "CLEAR" && dayNight()){
					$('#image').addClass('clear');
					$('#test').addClass('opacity6');
				} 
				else if(description === "CLEAR" && !dayNight()){
					$('#image').addClass('clearNight');
					$('#test').addClass('opacity6');
				} 
				else if (dayNight() && description.indexOf("SCATTERED") >= 0) {
					$('#test').addClass('opacity6');
					$('#image').addClass('scattered');
				}
				else if (dayNight() && description.indexOf("PARTLY") >= 0) {
					$('#test').addClass('opacity6');
					$('#image').addClass('scattered');
				}
				else if (description.indexOf("SCATTERED") >= 0 && !dayNight()) {
					$('#image').addClass('scatteredNight');
					$('#test').addClass('opacity4');
				}
				else if (description.indexOf("PARTLY") >= 0 && !dayNight()) {
					$('#image').addClass('scatteredNight');
					$('#test').addClass('opacity4');
				}
				else if(description.indexOf("MOSTLY") >= 0 && dayNight()) {
					$('#image').addClass('broken');
					$('#test').addClass('opacity3');
				}
				else if(description.indexOf("MOSTLY") >= 0 && !dayNight()) {
					$('#image').addClass('brokenNight');
					$('#test').addClass('opacity4');
				}
				else if (description === "OVERCAST" && dayNight()){
					$('#image').addClass('overcast');
				}
				else if (dayNight() && description.indexOf("THUNDERSTORM") >= 0){
					$('#image').addClass('thunderstorm');
					$('#test').addClass('opacity3');
				}
				else if (dayNight() && description.indexOf("HAIL") >= 0){
					$('#image').addClass('thunderstorm');
					$('#test').addClass('opacity3');
				}
				else if (description.indexOf("THUNDERSTORM") >= 0 && !dayNight()){
					$('#image').addClass('thunderstormNight');
					$('#test').addClass('opacity4');
				}
				else if (description.indexOf("HAIL") >= 0 && !dayNight()){
					$('#image').addClass('thunderstormNight');
					$('#test').addClass('opacity4');
				}
				else if (description.indexOf("SNOW") >= 0 && dayNight()){
					$('#image').addClass('snow');
					$('#test').addClass('opacity8');	
				}
				else if (description.indexOf("SNOW") >= 0 && !dayNight()){
					$('#image').addClass('snowNight');
					$('#test').addClass('opacity5');
				}
				else if (dayNight() && description.indexOf("RAIN") >= 0){
					$('#image').addClass('rain');
					$('#test').addClass('opacity8');
				}
				else if (dayNight() && description.indexOf("DRIZZLE") >= 0){
					$('#image').addClass('rain');
					$('#test').addClass('opacity8');
				}
				else if (description.indexOf("RAIN") >= 0 && !dayNight()){
					$('#image').addClass('rainNight');
					$('#test').addClass('opacity4');
				}
				else if (description.indexOf("DRIZZLE") >= 0 && !dayNight()){
					$('#image').addClass('rainNight');
					$('#test').addClass('opacity4');
				}
				else if (dayNight() && description.indexOf("FOG") >= 0){
					$('#image').addClass('fog');
				}
				else if (dayNight() && description.indexOf("MIST") >= 0){
					$('#image').addClass('fog');
				}
				else if (dayNight() && description.indexOf("SMOKE") >= 0){
					$('#image').addClass('smoke');
				}
				else if (dayNight() && description.indexOf("HAZE") >= 0){
					$('#image').addClass('smoke');
				}
				else if (description.indexOf("VOLCANIC") >= 0){
					$('#image').addClass('volcanic');
					$('#test').addClass('opacity5');
				}
				else if (dayNight() && description.indexOf("SAND") >= 0){
					$('#image').addClass('sand');
				}
				else if (dayNight() && description.indexOf("DUST") >= 0){
					$('#image').addClass('sand');
				}
				else if (!dayNight() && description === "OVERCAST" || description.indexOf("MIST") >= 0 || description.indexOf("FOG") >=0 || description.indexOf("HAZE") >=0 || description.indexOf("SMOKE") >=0 || description.indexOf("FOG") >=0){
					$('#image').addClass('overcastNight');
					$('#test').addClass('opacity4');
				}

				$("body[id$='image']").fadeIn(5000);

				$(".loading").fadeOut(1500);
			});
		}
	function zipCode(){
    	$(".col-xs-12").html("<input type='text' id='zip' placeholder='Zip Code' autocomplete='off'/><button id = 'getLocation' class = 'btn btn-primary'>WEATHER</button>" );
       	$("#getLocation").on("click", function(){
        	zipCode = document.getElementById('zip').value;
        	url = "https://api.wunderground.com/api/1c48f3eebc8ead0c/conditions/astronomy/forecast/alert/q/" +zipCode+ ".json";
        	$(".loading").fadeIn(500);
        	getWeather();
        });
	}

	function geoLocation(){
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
	    	//url to retrive JSON object from wunderground.  API key: 1c48f3eebc8ead0c
	    	url = "https://api.wunderground.com/api/1c48f3eebc8ead0c/conditions/astronomy/forecast/alert/q/" + lat + "," + lon + ".json";
	        //url = "https://api.wunderground.com/api/1c48f3eebc8ead0c/conditions/astronomy/forecast/alert/q/29.9017,-97.4975.json";
			getWeather();
			zipCode();
	        
	    });
	}
	
	if(isChrome){
		zipCode();
	}else{
		geoLocation();
	 }
});