import jQuery from "jquery";

var $ = jQuery;

$(document).ready(function() {
  
  var rightPanel = $('.right_panel');
  var image = $("img");
  
  TweenMax.to(rightPanel, 1.5, { scaleX: 1, ease: Circ.easeOut });
  TweenMax.to(image, 1, { opacity: 1, x: 0, delay: 0.7 });

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude,
          lon = position.coords.longitude;

      let API = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

      $.getJSON(API, function(data) {

        setTimeout(showInfo, 1000);
        
        function showInfo() {
          $("#loading_message").css('display', 'none');
          $("#loader").css('display', 'none');
          $(".weather").css('display', 'block');
          $(".main").css('display', 'block');
          $(".location").css('display', 'block');
        }
        
        var forecast = data.weather[0].main,
            description = data.weather[0].description,
            celsius = Math.floor(data.main.temp),
            fahrenheit = Math.floor(celsius * 1.8 + 32),
            humidity = data.main.humidity,
            pressure = data.main.pressure,
            inHg = Math.floor(pressure * 0.02953).toFixed(2),
            temp_max = Math.floor(data.main.temp_max),
            temp_min = Math.floor(data.main.temp_min),
            fahrenheitMax = Math.floor(temp_max * 1.8 + 32),
            fahrenheitMin = Math.floor(temp_min * 1.8 + 32),
            wind_deg = data.wind.deg,
            wind_speed = data.wind.speed,
            name = data.name,
            country = data.sys.country;

        switch (forecast) {
          case "Rain":
            $(".img1").css('border', "8px solid red");
            break;
          case "Drizzle":
            $(".img1").css('border', "8px solid red");
            break;
          case "Clouds":
            $(".img4").css('border', "8px solid red");
            break;
          case "Snow":
            $(".img6").css('border', "8px solid red");
            break;
          case "Clear":
            $(".img3").css('border', "8px solid red");
            break;
          case "Thunderstorm":
            $(".img2").css('border', "8px solid red");
            break;
          case "Mist":
            $(".img5").css('border', "8px solid red");
            break;
          case "Fog":
            $(".img5").css('border', "8px solid red");
            break;
        }
      
        $("#forecast").html(forecast);
        $("#description").html(description);
        $("#temp").html(fahrenheit + " °F");
        $("#humidity").html(humidity + "%");
        $("#pressure").html(inHg);
        $("#temp_max").html(fahrenheitMax + " °F");
        $("#temp_min").html(fahrenheitMin + " °F");
        $("#wind_deg").html(wind_deg);
        $("#wind_speed").html(wind_speed);
        $("#lat").html(Math.floor(lat).toFixed(2));
        $("#lon").html(Math.floor(lon).toFixed(2));
        $("#name").html(name);
        $("#country").html(country);
          
        $("#celsius").on('click', function(e) {
          e.preventDefault();
          $("#temp").html(celsius + " °C");
          $("#temp_max").html(temp_max + " °C");
          $("#temp_min").html(temp_min + " °C");
        });

        $("#fahrenheit").on('click', function(e) {
          e.preventDefault();
          $("#temp").html(fahrenheit + " °F");
          $("#temp_max").html(fahrenheitMax + " °F");
          $("#temp_min").html(fahrenheitMin + " °F");
        });
      
      }).fail(function(jqXHR) {
        if(jqXHR.status === 404) {
          $(".weather").css('display', 'none');
          $(".main").css('display', 'none');
          $(".location").css('display', 'none');
        }
      });
      
      console.log(forecast)

     

    });
  } else {
    alert("Geolocation is not supported");
  }
});
