let apiKey = "ee1ecc9974f5f6e39eb8070a4d86c8b7";
let searchinput = document.querySelector(".searchinput");
let box = document.querySelector(".box");
let normalMessage = document.querySelector(".normal-message");
let errorMessage = document.querySelector(".error-message");
let addedMessage = document.querySelector(".added-message");

// Function to get the date
let date = new Date().getDate();
let months_name = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let months = new Date().getMonth();
let year = new Date().getFullYear();

let FullDate = document.querySelector(".date");
FullDate.innerHTML = `${months_name[months]} ${date}, ${year}`;

// Weather info
async function city(cityName) {
  let url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
  );
  if (url.ok) {
    let data = await url.json();
    console.log(data);

    let pcsreen = document.querySelector(".pc");

    if (!box) {
      box = document.createElement("div");
      box.className = "box";
      pcsreen.appendChild(box);
    }

    let weatherBox = document.createElement("div");
    weatherBox.className = "weather-box";

    // Add close button (X)
    let closeButton = document.createElement("button");
    closeButton.className = "close-btn";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = function () {
      weatherBox.remove();
    };

    let nameDiv = document.createElement("div");
    nameDiv.className = "name";

    let cityElement = document.createElement("div");
    cityElement.className = "city-name city";
    cityElement.innerHTML = data.name;

    let tempElement = document.createElement("div");
    tempElement.className = "weather-temp temp";
    tempElement.innerHTML = Math.floor(data.main.temp) + "°";

    let weatherIconDiv = document.createElement("div");
    weatherIconDiv.className = "weather-icon";

    let weatherImg = document.createElement("img");
    weatherImg.className = "weather";

    if (data.weather[0].main === "Rain") {
      weatherImg.src = "img/rain.png";
    } else if (data.weather[0].main === "Clear") {
      weatherImg.src = "img/sun.png";
    } else if (data.weather[0].main === "Snow") {
      weatherImg.src = "img/snow.png";
    } else if (
      data.weather[0].main === "Clouds" ||
      data.weather[0].main === "Smoke"
    ) {
      weatherImg.src = "img/cloud.png";
    } else if (
      data.weather[0].main === "Mist" ||
      data.weather[0].main === "Fog"
    ) {
      weatherImg.src = "img/mist.png";
    } else if (data.weather[0].main === "Haze") {
      weatherImg.src = "img/haze.png";
    }

    weatherIconDiv.appendChild(weatherImg);
    nameDiv.appendChild(cityElement);
    nameDiv.appendChild(tempElement);
    weatherBox.appendChild(closeButton); // Add the close button to the weather box
    weatherBox.appendChild(nameDiv);
    weatherBox.appendChild(weatherIconDiv);
    box.appendChild(weatherBox);

    return weatherBox;
  } else {
    return "";
  }
}


// add section
let section = document.querySelector(".add-section");
let navBtn = document.querySelector(".button");
let navIcon = document.querySelector(".btn-icon");
let closeBtn = document.createElement("button"); // Create a close button

closeBtn.className = "close-btn";
closeBtn.innerHTML = "&times;"; // Set the close symbol
closeBtn.onclick = function () {
  section.style.top = "-60rem"; // Hide the popup
  navIcon.className = "fa-solid fa-circle-plus"; // Reset the nav icon
};

section.appendChild(closeBtn);


searchinput.addEventListener("keydown", async function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    const weatherInfo = await city(searchinput.value);
    if (weatherInfo) {
      normalMessage.style.display = "none";
      errorMessage.style.display = "none";
      addedMessage.style.display = "block";
    } else {
      normalMessage.style.display = "none";
      errorMessage.style.display = "block";
      addedMessage.style.display = "none";
    }
    box.prepend(weatherInfo);
  }
});

city("London");
city("Paris");
city("Toronto");
