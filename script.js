const apiKey = "64a3948a2a3dcfe3563540fc049c4e57"; // Your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Select the audio element
const backgroundMusic = document.getElementById("backgroundMusic");

// Ensure background music plays automatically
window.addEventListener("load", () => {
    // Check if the audio is ready to play
    if (backgroundMusic) {
        backgroundMusic.play();
    }
});

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) { // Check if the API response is okay
            throw new Error("City not found");
        }

        const data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Correct humidity data

        let gradient = "linear-gradient(135deg, #00feba, #5b548a)"; // Default gradient

        // Set the gradient according to the weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
            gradient = "linear-gradient(135deg, #a8c0ff, #3f2b96)"; // Cloudy gradient
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
            gradient = "linear-gradient(135deg, #ff7e5f, #feb47b)"; // Clear weather gradient
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
            gradient = "linear-gradient(135deg, #6a11cb, #2575fc)"; // Rainy gradient
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
            gradient = "linear-gradient(135deg, #ff8c00, #ff6a00)"; // Drizzle gradient
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
            gradient = "linear-gradient(135deg, #b2c2f9, #4158d0)"; // Misty gradient
        }

        // Apply the gradient with smooth transition
        setTimeout(() => {
            document.querySelector(".card").style.background = gradient;
        }, 100); // Delay of 100ms to ensure the gradient transition happens smoothly

        // Show weather details and hide error
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        // Handle errors (like city not found)
        console.log(error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); // Get city from input
    if (city !== "") {
        checkWeather(city); // Call the function with the city input
    }
});
