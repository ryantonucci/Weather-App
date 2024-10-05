let apiKey = "ee1ecc9974f5f6e39eb8070a4d86c8b7";
let searchinput = document.querySelector(`.searchinput`);

async function search(city, state, country) {
  let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city},${state},${country}&appid=${apiKey}`);

  if (url.ok) {
    let data = await url.json();
    console.log(data);

    let box = document.querySelector(".return");
    box.style.display = "block";

    let message = document.querySelector(".message");
    message.style.display = "none";

    let errormessage = document.querySelector(".error-message");
    errormessage.style.display = "none";

    let weatherImg = document.querySelector(".weather-img");
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';
    document.querySelector(".wind").innerHTML = Math.floor(data.wind.speed) + " m/s";
    document.querySelector(".pressure").innerHTML = Math.floor(data.main.pressure) + " hPa";
    document.querySelector('.humidity').innerHTML = Math.floor(data.main.humidity) + "%";

    // Convert sunrise and sunset times to local time and add 5 hours
    let sunriseDate = new Date(data.sys.sunrise * 1000);
    let sunsetDate = new Date(data.sys.sunset * 1000);

    // Adding 5 hours (in milliseconds)
    sunriseDate.setHours(sunriseDate.getHours() + 5);
    sunsetDate.setHours(sunsetDate.getHours() + 5);

    // Format the times
    let options = { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }; // Optional: add timeZoneName
    document.querySelector(".sunrise").innerHTML = new Intl.DateTimeFormat('en-US', options).format(sunriseDate);
    document.querySelector(".sunset").innerHTML = new Intl.DateTimeFormat('en-US', options).format(sunsetDate);

    // Set weather image based on conditions
    if (data.weather[0].main === "Rain") {
      weatherImg.src = "img/rain.png";
    } else if (data.weather[0].main === "Clear") {
      weatherImg.src = "img/sun.png";
    } else if (data.weather[0].main === "Snow") {
      weatherImg.src = "img/snow.png";
    } else if (data.weather[0].main === "Clouds" || data.weather[0].main === "Smoke") {
      weatherImg.src = "img/cloud.png";
    } else if (data.weather[0].main === "Mist" || data.weather[0].main === "Fog") {
      weatherImg.src = "img/mist.png";
    } else if (data.weather[0].main === "Haze") {
      weatherImg.src = "img/haze.png";
    }
  } else {
    let box = document.querySelector(".return");
    box.style.display = "none";

    let message = document.querySelector(".message");
    message.style.display = "none";

    let errormessage = document.querySelector(".error-message");
    errormessage.style.display = "block";
  }
}

searchinput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    // Get the values from search input (city, state, country) if applicable
    let [city, state, country] = searchinput.value.split(',').map(item => item.trim());
    search(city, state, country);
    console.log("worked");
  }
});
