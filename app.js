const apiKey = "2b892905c2f3fa7ed3afeb83b6e5cf9d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherImg = document.querySelector(".weather-icons");

async function checkWeather(city) {
    let data;  // Declare the data variable outside of the try block
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error(`City not found! Status: ${response.status}`);
        }

        data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update the weather image based on the weather conditions
         if (data.weather[0].main.toLowerCase() === "rain") {
            WeatherImg.src = "images/rain.png";
        } else if (data.weather[0].main.toLowerCase() === "mist") {
            WeatherImg.src = "images/mist.png";
        } else if (data.weather[0].main.toLowerCase() === "drizzle") {
            WeatherImg.src = "images/drizzle.png";
        }
            else if (data.weather[0].main.toLowerCase() === "cloud") {
                WeatherImg.src = "images/clouds.png";
            }
            else if (data.weather[0].main.toLowerCase() === "snow") {
                WeatherImg.src = "images/snow.png";
            }
         else {
            WeatherImg.src = "images/clear.png"; 
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".city").innerHTML = "City not found!";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        WeatherImg.src = "images/error.png";  // Image for error cases
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
