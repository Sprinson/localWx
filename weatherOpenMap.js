$(document).ready(function(){
	 
var url, c, f, description;
var date = new Date;


	//$("#getLocation").on("click", function(){

	  if (navigator.geolocation){
	    navigator.geolocation.getCurrentPosition(function(position){
	    	var lat = position.coords.latitude;
	    	var lon = position.coords.longitude;
	      	//url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&mode=json&units=metric&APPID=0531039e1fb1d6ebe80315823a3cccc3";
	        //url = "http://api.openweathermap.org/data/2.5/weather?lat=39.525060&lon=-104.807316&mode=json&units=metric&APPID=0531039e1fb1d6ebe80315823a3cccc3";
	        
	        
	      $.getJSON(url, function(json){
	      	c = json["main"]["temp"];
	      	f = Math.round((1.8 * c) + 32);
	      	description = json["weather"][0]["description"].toUpperCase();
	      	$(".display-3").html(json["name"]);
	      	$(".lead").html(json["main"]["temp"] + " &#8451 " + " | " + f + " &#8457<br>" + description + "<br> Local Time: " + date);

	      	console.log(json["weather"][0]["description"]);

	      	if(json["weather"][0]["description"] === "clear sky"){
	      	$('body').css('background-image', 'url(images/clear.jpg)');
	      	} else if (json["weather"][0]["description"] === "scattered clouds") {
	      		$('body').css('background-image', 'url(images/scattered.jpg)');
	      		document.getElementById("test").style.opacity = "0.6";
	      	} else if (json["weather"][0]["description"] === "few clouds"){
	      		$('body').css('background-image', 'url(images/scattered.jpg)');
	      		document.getElementById("test").style.opacity = "0.6";
	      	} else if(json["weather"][0]["description"] === "broken clouds") {
	      		$('body').css('background-image', 'url(images/broken.jpg)');
	      	}else if (json["weather"][0]["description"] === "overcast clouds"){
	      		$('body').css('background-image', 'url(images/overcast.jpg)');
	      	} else if (json["weather"][0]["description"] === "light rain"){
	      		$('body').css('background-image', 'url(images/overcast.jpg)');
	      	} else if (json["weather"][0]["description"] === "shower rain"){
	      		$('body').css('background-image', 'url(images/rain.jpg)');
	      		document.getElementById("test").style.opacity = "0.6";

	      		
	      	} 
	     
	      });
	    });
	  } 
	  
	//});
  
  



});