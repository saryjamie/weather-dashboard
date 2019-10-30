var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";

function currentWeather(){
  navigator.geolocation.getCurrentPosition(function (position){
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" +  apiKey;

    $.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    var iconCode = response.weather[0].icon;
    
    var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $(".city").html("<h1> " + response.name + " </h1>");
    $(".temp").text("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0) + " °F");
    $(".humidity").text("Humidity: " + response.main.humidity + " %");
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
    $("#wicon").attr("src", iconurl);
  });

  });
};

currentWeather();

////////////////////////

function fiveDayForecast(){



var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=San+Diego&appid=" + apiKey;


$.ajax({
  url: fiveDayURL,
  method: "GET"
}).then(function(responseTwo) {

  var icon1 = responseTwo.list[4].weather[0].icon;
  var icon1url = "http://openweathermap.org/img/w/" + icon1 + ".png";

  var icon2 = responseTwo.list[4].weather[0].icon;
  var icon2url = "http://openweathermap.org/img/w/" + icon2 + ".png";

  var icon3 = responseTwo.list[4].weather[0].icon;
  var icon3url = "http://openweathermap.org/img/w/" + icon3 + ".png";

  var icon4 = responseTwo.list[4].weather[0].icon;
  var icon4url = "http://openweathermap.org/img/w/" + icon4 + ".png";

  var icon5 = responseTwo.list[4].weather[0].icon;
  var icon5url = "http://openweathermap.org/img/w/" + icon5 + ".png";

  // Converts the temp to Kelvin with the below formula & then sets it to 2 decimal points
  var tempOneF = (responseTwo.list[4].main.temp - 273.15) * 1.8 + 32;
  var tempOne = tempOneF.toFixed(1);
  var tempTwoF = (responseTwo.list[12].main.temp - 273.15) * 1.8 + 32;
  var tempTwo = tempTwoF.toFixed(1);
  var tempThreeF = (responseTwo.list[20].main.temp - 273.15) * 1.8 + 32;
  var tempThree = tempThreeF.toFixed(1);
  var tempFourF = (responseTwo.list[28].main.temp - 273.15) * 1.8 + 32;
  var tempFour = tempFourF.toFixed(1);
  var tempFiveF = (responseTwo.list[36].main.temp - 273.15) * 1.8 + 32;
  var tempFive = tempFiveF.toFixed(1);

  var day1 = responseTwo.list[4].dt_txt;
  var day2 = responseTwo.list[12].dt_txt;
  var day3 = responseTwo.list[20].dt_txt;
  var day4 = responseTwo.list[28].dt_txt;
  var day5 = responseTwo.list[36].dt_txt;

  $("#day-1").html("<h5>" + day1.substr(0, 10) + "</h5>");
  $("#day-1").append("<img src=" + icon1url + ">");
  $("#day-1").append("<p>" + "Temp: " + tempOne + " °F </p>");
  $("#day-1").append("<p>" + "Humidity: " + responseTwo.list[4].main.humidity + " % </p>");

  $("#day-2").html("<h5>" + day2.substr(0, 10) + "</h5>");
  $("#day-2").append("<img src=" + icon2url + ">");
  $("#day-2").append("<p>" + "Temp: " + tempTwo + " °F </p>");
  $("#day-2").append("<p>" + "Humidity: " + responseTwo.list[12].main.humidity + " % </p>");

  $("#day-3").html("<h5>" + day3.substr(0, 10) + "</h5>");
  $("#day-3").append("<img src=" + icon3url + ">");
  $("#day-3").append("<p>" + "Temp: " + tempThree + " °F </p>");
  $("#day-3").append("<p>" + "Humidity: " + responseTwo.list[20].main.humidity + " % </p>");

  $("#day-4").html("<h5>" + day4.substr(0, 10) + "</h5>");
  $("#day-4").append("<img src=" + icon4url + ">");
  $("#day-4").append("<p>" + "Temp: " + tempFour + " °F </p>");
  $("#day-4").append("<p>" + "Humidity: " + responseTwo.list[28].main.humidity + " % </p>");

  $("#day-5").html("<h5>" + day5.substr(0, 10) + "</h5>");
  $("#day-5").append("<img src=" + icon5url + ">");
  $("#day-5").append("<p>" + "Temp: " + tempFive + " °F </p>");
  $("#day-5").append("<p>" + "Humidity: " + responseTwo.list[36].main.humidity + " % </p>");
});
}

fiveDayForecast();
////////////////////////////

$("button").on("click", function(event) {
  event.preventDefault();


  var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";
  var getWeather = $("#get-weather");
  var city = getWeather.val().trim();
  cities.push(city)
  var message = document.querySelector(".invalid-message");
   
  console.log(getWeather);

  function storeCities(){
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  if (city === null || city === "" ){
    message.innerHTML = "Invalid input. Please try again!";
  } else {
    message.innerHTML = "";
    renderCities();
    storeCities();
    getCities();
  }
  function renderCities() {
    
    $(".search-data").prepend("<p>" + city  + "</p");

  }
  
  

  

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&q=" +
    city + "&appid=" + apiKey;
  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      // Log the queryURL
      console.log(queryURL);
      // Log the resulting object
      console.log(response);
      // Transfer content to HTML
      var iconCode = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      $(".city").html("<h1>" + response.name + "</h1>");
      $(".temp").text(
        "Temperature: " +
          ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0) +
          " °F"
      );
      $(".humidity").text("Humidity: " + response.main.humidity + " %");
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      $("#wicon").attr("src", iconurl);
      // Converts the temp to Kelvin with the below formula

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });

  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
  $.ajax({
    url: fiveDayURL,
    method: "GET"
  }).then(function(responseTwo) {
    // Log the queryURL
    console.log(fiveDayURL);
    // Log the resulting object
    console.log(responseTwo);
    console.log(responseTwo.list[4].dt_txt);
    console.log(responseTwo.list[4].main.temp);

    var icon1 = responseTwo.list[4].weather[0].icon;
    var icon1url = "http://openweathermap.org/img/w/" + icon1 + ".png";
  
    var icon2 = responseTwo.list[4].weather[0].icon;
    var icon2url = "http://openweathermap.org/img/w/" + icon2 + ".png";
  
    var icon3 = responseTwo.list[4].weather[0].icon;
    var icon3url = "http://openweathermap.org/img/w/" + icon3 + ".png";
  
    var icon4 = responseTwo.list[4].weather[0].icon;
    var icon4url = "http://openweathermap.org/img/w/" + icon4 + ".png";
  
    var icon5 = responseTwo.list[4].weather[0].icon;
    var icon5url = "http://openweathermap.org/img/w/" + icon5 + ".png";

    // Converts the temp to Kelvin with the below formula & then sets it to 2 decimal points
    var tempOneF = (responseTwo.list[4].main.temp - 273.15) * 1.8 + 32;
    var tempOne = tempOneF.toFixed(1);
    var tempTwoF = (responseTwo.list[12].main.temp - 273.15) * 1.8 + 32;
    var tempTwo = tempTwoF.toFixed(1);
    var tempThreeF = (responseTwo.list[20].main.temp - 273.15) * 1.8 + 32;
    var tempThree = tempThreeF.toFixed(1);
    var tempFourF = (responseTwo.list[28].main.temp - 273.15) * 1.8 + 32;
    var tempFour = tempFourF.toFixed(1);
    var tempFiveF = (responseTwo.list[36].main.temp - 273.15) * 1.8 + 32;
    var tempFive = tempFiveF.toFixed(1);

    var day1 = responseTwo.list[4].dt_txt;
    var day2 = responseTwo.list[12].dt_txt;
    var day3 = responseTwo.list[20].dt_txt;
    var day4 = responseTwo.list[28].dt_txt;
    var day5 = responseTwo.list[36].dt_txt;

    // var icon1Code = responseTwo.list[4].weather[0].icon;
    // var icon1url = "http://openweathermap.org/img/w/" + icon1Code + ".png";


    $("#day-1").html("<h5>" + day1.substr(0, 10) + "</h5>");
    $("#day-1").append("<img src=" + icon1url + ">");
    $("#day-1").append("<p>" + "Temp: " + tempOne + " °F </p>");
    $("#day-1").append("<p>" + "Humidity: " + responseTwo.list[4].main.humidity + " % </p>");
  
    $("#day-2").html("<h5>" + day2.substr(0, 10) + "</h5>");
    $("#day-2").append("<img src=" + icon2url + ">");
    $("#day-2").append("<p>" + "Temp: " + tempTwo + " °F </p>");
    $("#day-2").append("<p>" + "Humidity: " + responseTwo.list[12].main.humidity + " % </p>");
  
    $("#day-3").html("<h5>" + day3.substr(0, 10) + "</h5>");
    $("#day-3").append("<img src=" + icon3url + ">");
    $("#day-3").append("<p>" + "Temp: " + tempThree + " °F </p>");
    $("#day-3").append("<p>" + "Humidity: " + responseTwo.list[20].main.humidity + " % </p>");
  
    $("#day-4").html("<h5>" + day4.substr(0, 10) + "</h5>");
    $("#day-4").append("<img src=" + icon4url + ">");
    $("#day-4").append("<p>" + "Temp: " + tempFour + " °F </p>");
    $("#day-4").append("<p>" + "Humidity: " + responseTwo.list[28].main.humidity + " % </p>");
  
    $("#day-5").html("<h5>" + day5.substr(0, 10) + "</h5>");
    $("#day-5").append("<img src=" + icon5url + ">");
    $("#day-5").append("<p>" + "Temp: " + tempFive + " °F </p>");
    $("#day-5").append("<p>" + "Humidity: " + responseTwo.list[36].main.humidity + " % </p>");
  });
  
});

var cities = [];

function getCities(){
  var getCity = localStorage.getItem("cities");
  console.log(getCity);
}