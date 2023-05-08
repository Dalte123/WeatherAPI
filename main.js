let cityName;

function storeCityName() {
  cityName = document.getElementById("cityNameInput").value;
  return cityName;
}

let baseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
let apiKey = "8VR9LVRJ98L7WMQ6U3Q5FRLDK";
let defaultCity = "new york";

async function getData(cityName) {
  let url = `${baseUrl}${cityName}?unitGroup=metric&key=${apiKey}&contentType=json`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const { resolvedAddress, timezone } = data;
      const {
        currentConditions: { temp, feelslike, humidity, icon },
      } = data;
      let time = new Date();
      let localTime = time.toLocaleString();
      console.log(localTime);
      document.getElementById("ra").textContent = resolvedAddress;
      document.getElementById("tz").textContent = timezone;
      document.getElementById("dt").textContent = localTime;
      document.getElementById("tmp").textContent = Math.round(temp) +"°C";
      document.getElementById("fl").textContent = feelslike+"°";
      document.getElementById("hu").textContent = humidity;
      console.log(icon);
      const iconMap = {
        cloudy: "cloudy.png",
        wind: "wind.png",
        thunder: "thunder.png",
        "thunder-showers-night": "thunder-showers-night.png",
        "thunder-showers-day": "thunder-showers-day.png",
        "thunder-rain": "thunder-rain.png",
        snow: "snow.png",
        "snow-showers-night": "snow-showers-night.png",
        "snow-showers-day": "snow-showers-day.png",
        sleet: "sleet.png",
        "showers-night": "showers-night.png",
        "showers-day": "showers-day.png",
        rain: "rain.png",
        "rain-snow": "rain-snow.png",
        "rain-snow-showers-night": "rain-snow-showers-night.png",
        "rain-snow-showers-day": "rain-snow-showers-day.png",
        "partly-cloudy-night": "partly-cloudy-night.png",
        "partly-cloudy-day": "partly-cloudy-day.png",
        hail: "hail.png",
        fog: "fog.png",
        "clear-night": "clear-night.png",
        "clear-day": "clear-day.png",
      };
      // Create an img element
      const img = document.createElement("img");
      // Set the src attribute of the img element based on the icon value
      if (iconMap.hasOwnProperty(icon)) {
        img.src = `icons/${iconMap[icon]}`;
      } else {
        // Use a default icon if the icon value is not recognized
        //  img.src = 'path/to/icons/default.png';
      }
      // Append the img element to the HTML document
      document.getElementById("icons").src = img.src;
    } else {
      console.log("Response not OK.");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function () {
  storeCityName();
  getData(cityName);
});
getData(defaultCity);