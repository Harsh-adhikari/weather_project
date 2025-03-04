// document.addEventListener("DOMContentLoaded", () => {
//     // Event listeners
//     document.getElementById("city").addEventListener("keypress", function(event) {
//         if (event.key === "Enter") {
//             getWeather();
//         }
//     });

//     document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
    
//     // Set up geolocation on load
//     document.getElementById("geolocation-button").addEventListener("click", getLocationWeather);
    
//     // Load saved theme preference
//     loadThemePreference();
    
//     // Load last searched city if available
//     loadLastCity();
// });

// // Get user's location and fetch weather
// function getLocationWeather() {
//     document.getElementById("loading-spinner").style.display = "block";
    
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const lat = position.coords.latitude;
//                 const lon = position.coords.longitude;
//                 getWeatherByCoords(lat, lon);
//             },
//             (error) => {
//                 document.getElementById("loading-spinner").style.display = "none";
//                 alert(`Geolocation error: ${error.message}`);
//             }
//         );
//     } else {
//         document.getElementById("loading-spinner").style.display = "none";
//         alert("Geolocation is not supported by this browser.");
//     }
// }

// // Get weather by coordinates
// function getWeatherByCoords(lat, lon) {
//     const apiKey = '006c00193b566f436f92a6309ceed614';
    
//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
//     Promise.all([
//         fetch(currentWeatherUrl).then(response => response.json()),
//         fetch(forecastUrl).then(response => response.json())
//     ])
//     .then(([weatherData, forecastData]) => {
//         displayWeather(weatherData);
//         displayHourlyForecast(forecastData.list);
//         document.getElementById("loading-spinner").style.display = "none";
//     })
//     .catch(error => {
//         console.error('Error fetching weather data:', error);
//         alert('Error fetching weather data. Please try again.');
//         document.getElementById("loading-spinner").style.display = "none";
//     });
// }

// // Get weather by city name
// function getWeather() {
//     const apiKey = '006c00193b566f436f92a6309ceed614';
//     const city = document.getElementById('city').value;
//     if (!city) {
//         alert('Please enter a city');
//         return;
//     }
    
//     // Show loading spinner
//     document.getElementById("loading-spinner").style.display = "block";
    
//     // Save last searched city
//     localStorage.setItem('lastCity', city);

//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

//     Promise.all([
//         fetch(currentWeatherUrl).then(response => response.json()),
//         fetch(forecastUrl).then(response => response.json())
//     ])
//     .then(([weatherData, forecastData]) => {
//         displayWeather(weatherData);
//         displayHourlyForecast(forecastData.list);
//         document.getElementById("loading-spinner").style.display = "none";
//     })
//     .catch(error => {
//         console.error('Error fetching weather data:', error);
//         alert('Error fetching weather data. Please try again.');
//         document.getElementById("loading-spinner").style.display = "none";
//     });
// }

// function displayWeather(data) {
//     const tempDivInfo = document.getElementById('temp-div');
//     const weatherInfoDiv = document.getElementById('weather-info');
//     const weatherIcon = document.getElementById('weather-icon');
//     const hourlyForecastDiv = document.getElementById('hourly-forecast');
//     const dailyForecastDiv = document.getElementById('daily-forecast');
//     const weatherCardContainer = document.getElementById('weather-card');

//     // Clear previous content
//     weatherInfoDiv.innerHTML = '';
//     tempDivInfo.innerHTML = '';

//     if (data.cod === '404') {
//         weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
//         weatherCardContainer.style.display = 'none';
//     } else {
//         weatherCardContainer.style.display = 'block';
        
//         const cityName = data.name;
//         const country = data.sys.country;
//         const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
//         const feelsLike = Math.round(data.main.feels_like - 273.15);
//         const description = data.weather[0].description;
//         const iconCode = data.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

//         // Additional weather data
//         const humidity = data.main.humidity;
//         const windSpeed = data.wind.speed;
//         const pressure = data.main.pressure;
//         const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
//         const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
        
//         // Update page title with weather info
//         document.title = `${temperature}°C | ${cityName} Weather`;
        
//         // Format date and time
//         const date = new Date();
//         const formattedDate = date.toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
        
//         const temperatureHTML = `
//             <p>${temperature}°C</p>
//             <p class="feels-like">Feels like: ${feelsLike}°C</p>
//         `;

//         const weatherHtml = `
//             <p class="city-name"><strong>${cityName}, ${country}</strong></p>
//             <p class="date">${formattedDate}</p>
//             <p class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
//             <div class="weather-details">
//                 <div class="detail">
//                     <span class="detail-icon">💧</span>
//                     <span class="detail-value">${humidity}%</span>
//                     <span class="detail-label">Humidity</span>
//                 </div>
//                 <div class="detail">
//                     <span class="detail-icon">🌬️</span>
//                     <span class="detail-value">${windSpeed}</span>
//                     <span class="detail-label">Wind (m/s)</span>
//                 </div>
//                 <div class="detail">
//                     <span class="detail-icon">🔆</span>
//                     <span class="detail-value">${pressure}</span>
//                     <span class="detail-label">Pressure</span>
//                 </div>
//             </div>
//             <div class="sun-info">
//                 <div class="sun-detail">
//                     <span class="sun-icon">🌅</span>
//                     <span class="sun-time">${sunrise}</span>
//                     <span class="sun-label">Sunrise</span>
//                 </div>
//                 <div class="sun-detail">
//                     <span class="sun-icon">🌇</span>
//                     <span class="sun-time">${sunset}</span>
//                     <span class="sun-label">Sunset</span>
//                 </div>
//             </div>
//         `;

//         tempDivInfo.innerHTML = temperatureHTML;
//         weatherInfoDiv.innerHTML = weatherHtml;
//         weatherIcon.src = iconUrl;
//         weatherIcon.alt = description;
//         weatherIcon.style.display = 'block';
//     }
// }

// function displayHourlyForecast(hourlyData) {
//     const hourlyForecastDiv = document.getElementById('hourly-forecast');
//     const dailyForecastDiv = document.getElementById('daily-forecast');

//     // Process hourly forecast
//     const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

//     // Updated HTML structure with horizontal scrolling
//     hourlyForecastDiv.innerHTML = `
//         <h3>Hourly Forecast</h3>
//         <div class="hourly-forecast-scroll">
//             ${next24Hours.map(item => {
//                 const dateTime = new Date(item.dt * 1000);
//                 const hour = dateTime.getHours();
//                 const temperature = Math.round(item.main.temp - 273.15);
//                 const iconCode = item.weather[0].icon;
//                 const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
//                 const description = item.weather[0].description;

//                 return `
//                     <div class="hourly-item">
//                         <span class="hour">${hour}:00</span>
//                         <img src="${iconUrl}" alt="${description}">
//                         <span class="temp">${temperature}°C</span>
//                     </div>
//                 `;
//             }).join('')}
//         </div>
//         <div class="forecast-nav">
//             <div class="scroll-btn scroll-left" onclick="scrollForecast('hourly-forecast-scroll', -200)">
//                 <i class="fas fa-chevron-left"></i>
//             </div>
//             <div class="scroll-btn scroll-right" onclick="scrollForecast('hourly-forecast-scroll', 200)">
//                 <i class="fas fa-chevron-right"></i>
//             </div>
//         </div>
//     `;

//     // Process daily forecast
//     const dailyForecasts = processDailyForecast(hourlyData);
    
//     // Updated HTML structure with horizontal scrolling for daily forecast
//     dailyForecastDiv.innerHTML = `
//         <h3>5-Day Forecast</h3>
//         <div class="daily-forecast-scroll">
//             ${dailyForecasts.map(day => {
//                 const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
//                 return `
//                     <div class="daily-item">
//                         <span class="day">${dayName}</span>
//                         <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}">
//                         <div class="daily-temp">
//                             <span class="max-temp">${Math.round(day.maxTemp)}°</span>
//                             <span class="min-temp">${Math.round(day.minTemp)}°</span>
//                         </div>
//                     </div>
//                 `;
//             }).join('')}
//         </div>
//         <div class="forecast-nav">
//             <div class="scroll-btn scroll-left" onclick="scrollForecast('daily-forecast-scroll', -200)">
//                 <i class="fas fa-chevron-left"></i>
//             </div>
//             <div class="scroll-btn scroll-right" onclick="scrollForecast('daily-forecast-scroll', 200)">
//                 <i class="fas fa-chevron-right"></i>
//             </div>
//         </div>
//     `;

//     // Add scroll function to window for the scrolling buttons
//     window.scrollForecast = function(className, amount) {
//         const container = document.querySelector(`.${className}`);
//         container.scrollBy({ left: amount, behavior: 'smooth' });
//     };
// }

// // Process hourly data into daily forecast
// function processDailyForecast(hourlyData) {
//     const dailyMap = new Map();
    
//     hourlyData.forEach(item => {
//         const date = new Date(item.dt * 1000);
//         const day = date.toISOString().split('T')[0];
        
//         if (!dailyMap.has(day)) {
//             dailyMap.set(day, {
//                 date: date,
//                 minTemp: item.main.temp_min - 273.15,
//                 maxTemp: item.main.temp_max - 273.15,
//                 icon: item.weather[0].icon,
//                 description: item.weather[0].description
//             });
//         } else {
//             const currentDay = dailyMap.get(day);
//             currentDay.minTemp = Math.min(currentDay.minTemp, item.main.temp_min - 273.15);
//             currentDay.maxTemp = Math.max(currentDay.maxTemp, item.main.temp_max - 273.15);
//         }
//     });
    
//     return Array.from(dailyMap.values()).slice(0, 5);
// }

// function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
    
//     // Save theme preference
//     const isDarkMode = document.body.classList.contains('dark-mode');
//     localStorage.setItem('darkMode', isDarkMode);
    
//     // Update button text
//     const darkModeButton = document.getElementById('dark-mode-toggle');
//     darkModeButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
// }

// function loadThemePreference() {
//     const isDarkMode = localStorage.getItem('darkMode') === 'true';
//     if (isDarkMode) {
//         document.body.classList.add('dark-mode');
//         document.getElementById('dark-mode-toggle').textContent = 'Light Mode';
//     }
// }

// function loadLastCity() {
//     const lastCity = localStorage.getItem('lastCity');
//     if (lastCity) {
//         document.getElementById('city').value = lastCity;
//         getWeather();
//     }
// }



document.addEventListener("DOMContentLoaded", () => {
    // Event listeners
    document.getElementById("city").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            getWeather();
        }
    });

    document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
    
    // Set up geolocation on load
    document.getElementById("geolocation-button").addEventListener("click", getLocationWeather);
    
    // Load saved theme preference
    loadThemePreference();
    
    // Rather than automatically loading the last city,
    // just populate the input field but don't perform the search
    populateLastCityInput();
    
    // Hide the weather card and forecast container on initial load
    document.getElementById("weather-card").style.display = "none";
    document.getElementById("forecast-container").style.display = "none";
});

// Get user's location and fetch weather
function getLocationWeather() {
    document.getElementById("loading-spinner").style.display = "block";
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
            },
            (error) => {
                document.getElementById("loading-spinner").style.display = "none";
                alert(`Geolocation error: ${error.message}`);
            }
        );
    } else {
        document.getElementById("loading-spinner").style.display = "none";
        alert("Geolocation is not supported by this browser.");
    }
}

// Get weather by coordinates
function getWeatherByCoords(lat, lon) {
    const apiKey = '006c00193b566f436f92a6309ceed614';
    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    Promise.all([
        fetch(currentWeatherUrl).then(response => response.json()),
        fetch(forecastUrl).then(response => response.json())
    ])
    .then(([weatherData, forecastData]) => {
        displayWeather(weatherData);
        displayHourlyForecast(forecastData.list);
        // Show forecast container when data is loaded
        document.getElementById("forecast-container").style.display = "block";
        document.getElementById("loading-spinner").style.display = "none";
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
        document.getElementById("loading-spinner").style.display = "none";
    });
}

// Get weather by city name
function getWeather() {
    const apiKey = '006c00193b566f436f92a6309ceed614';
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }
    
    // Show loading spinner
    document.getElementById("loading-spinner").style.display = "block";
    
    // Save last searched city
    localStorage.setItem('lastCity', city);

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    Promise.all([
        fetch(currentWeatherUrl).then(response => response.json()),
        fetch(forecastUrl).then(response => response.json())
    ])
    .then(([weatherData, forecastData]) => {
        displayWeather(weatherData);
        displayHourlyForecast(forecastData.list);
        // Show forecast container when data is loaded
        document.getElementById("forecast-container").style.display = "block";
        document.getElementById("loading-spinner").style.display = "none";
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
        document.getElementById("loading-spinner").style.display = "none";
    });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const dailyForecastDiv = document.getElementById('daily-forecast');
    const weatherCardContainer = document.getElementById('weather-card');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        weatherCardContainer.style.display = 'none';
        document.getElementById("forecast-container").style.display = "none";
    } else {
        weatherCardContainer.style.display = 'block';
        
        const cityName = data.name;
        const country = data.sys.country;
        const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
        const feelsLike = Math.round(data.main.feels_like - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Additional weather data
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const pressure = data.main.pressure;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
        
        // Update page title with weather info
        document.title = `${temperature}°C | ${cityName} Weather`;
        
        // Format date and time
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const temperatureHTML = `
            <p>${temperature}°C</p>
            <p class="feels-like">Feels like: ${feelsLike}°C</p>
        `;

        const weatherHtml = `
            <p class="city-name"><strong>${cityName}, ${country}</strong></p>
            <p class="date">${formattedDate}</p>
            <p class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <div class="weather-details">
                <div class="detail">
                    <span class="detail-icon">💧</span>
                    <span class="detail-value">${humidity}%</span>
                    <span class="detail-label">Humidity</span>
                </div>
                <div class="detail">
                    <span class="detail-icon">🌬️</span>
                    <span class="detail-value">${windSpeed}</span>
                    <span class="detail-label">Wind (m/s)</span>
                </div>
                <div class="detail">
                    <span class="detail-icon">🔆</span>
                    <span class="detail-value">${pressure}</span>
                    <span class="detail-label">Pressure</span>
                </div>
            </div>
            <div class="sun-info">
                <div class="sun-detail">
                    <span class="sun-icon">🌅</span>
                    <span class="sun-time">${sunrise}</span>
                    <span class="sun-label">Sunrise</span>
                </div>
                <div class="sun-detail">
                    <span class="sun-icon">🌇</span>
                    <span class="sun-time">${sunset}</span>
                    <span class="sun-label">Sunset</span>
                </div>
            </div>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = 'block';
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const dailyForecastDiv = document.getElementById('daily-forecast');

    // Process hourly forecast
    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    // Updated HTML structure with horizontal scrolling
    hourlyForecastDiv.innerHTML = `
        <h3>Hourly Forecast</h3>
        <div class="hourly-forecast-scroll">
            ${next24Hours.map(item => {
                const dateTime = new Date(item.dt * 1000);
                const hour = dateTime.getHours();
                const temperature = Math.round(item.main.temp - 273.15);
                const iconCode = item.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
                const description = item.weather[0].description;

                return `
                    <div class="hourly-item">
                        <span class="hour">${hour}:00</span>
                        <img src="${iconUrl}" alt="${description}">
                        <span class="temp">${temperature}°C</span>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="forecast-nav">
            <div class="scroll-btn scroll-left" onclick="scrollForecast('hourly-forecast-scroll', -200)">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="scroll-btn scroll-right" onclick="scrollForecast('hourly-forecast-scroll', 200)">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    `;

    // Process daily forecast
    const dailyForecasts = processDailyForecast(hourlyData);
    
    // Updated HTML structure with horizontal scrolling for daily forecast
    dailyForecastDiv.innerHTML = `
        <h3>5-Day Forecast</h3>
        <div class="daily-forecast-scroll">
            ${dailyForecasts.map(day => {
                const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
                return `
                    <div class="daily-item">
                        <span class="day">${dayName}</span>
                        <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}">
                        <div class="daily-temp">
                            <span class="max-temp">${Math.round(day.maxTemp)}°</span>
                            <span class="min-temp">${Math.round(day.minTemp)}°</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="forecast-nav">
            <div class="scroll-btn scroll-left" onclick="scrollForecast('daily-forecast-scroll', -200)">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="scroll-btn scroll-right" onclick="scrollForecast('daily-forecast-scroll', 200)">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    `;

    // Add scroll function to window for the scrolling buttons
    window.scrollForecast = function(className, amount) {
        const container = document.querySelector(`.${className}`);
        container.scrollBy({ left: amount, behavior: 'smooth' });
    };
}

// Process hourly data into daily forecast
function processDailyForecast(hourlyData) {
    const dailyMap = new Map();
    
    hourlyData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toISOString().split('T')[0];
        
        if (!dailyMap.has(day)) {
            dailyMap.set(day, {
                date: date,
                minTemp: item.main.temp_min - 273.15,
                maxTemp: item.main.temp_max - 273.15,
                icon: item.weather[0].icon,
                description: item.weather[0].description
            });
        } else {
            const currentDay = dailyMap.get(day);
            currentDay.minTemp = Math.min(currentDay.minTemp, item.main.temp_min - 273.15);
            currentDay.maxTemp = Math.max(currentDay.maxTemp, item.main.temp_max - 273.15);
        }
    });
    
    return Array.from(dailyMap.values()).slice(0, 5);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Save theme preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update button text
    const darkModeButton = document.getElementById('dark-mode-toggle');
    darkModeButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
}

function loadThemePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').textContent = 'Light Mode';
    }
}

// New function - just populates the input field without performing the search
function populateLastCityInput() {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('city').value = lastCity;
        // Don't call getWeather() here anymore
    }
}