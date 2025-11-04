function getForecast(latitude, longitude, parentDiv) {
    const url = `https://api.weatherbit.io/v2.0/current?lang=ru&lat=${latitude}&lon=${longitude}&key=6d4878b83fcf4b0e930141563796aeb6`;
    let forecast = null
    fetch(url)
        .then(responce => responce.json())
        .then(data => forecast = data.data[0])
        .catch(error => console.log(error))

    setTimeout(() => {
        console.log(forecast);
        createForecastDiv(forecast, parentDiv)
    }, 3000);
}

function createForecastDiv(forecast, parentDiv) {
    const forecastDiv = document.createElement('div');
    const leftDiv = document.createElement('div');
    const cityNameH2 = document.createElement('h2');
    const temperatureP = document.createElement('p');
    const temperatureSpan = document.createElement('span');
    const descriptionP = document.createElement('p');
    const image = document.createElement('img');
    
    cityNameH2.innerText = forecast.city_name;
    temperatureP.innerText = 'Температура:';
    temperatureSpan.innerText = forecast.temp;
    descriptionP.innerText = forecast.weather.description;
    
    forecastDiv.className = 'forecast';
    leftDiv.className = 'forecast-left';
    cityNameH2.className = 'city-name';
    temperatureP.className = 'temperature-p';
    temperatureSpan.className = 'temperature';
    descriptionP.className = 'weather-description';
    image.className = 'weather-img';
    
    temperatureP.appendChild(temperatureSpan);
    leftDiv.appendChild(cityNameH2);
    leftDiv.appendChild(temperatureP);
    leftDiv.appendChild(descriptionP);
    forecastDiv.appendChild(leftDiv);
    forecastDiv.appendChild(image);
    parentDiv.appendChild(forecastDiv);
}


const forecastsDiv = document.getElementById('forecasts');
const showForecastBtn = document.getElementById('show-forecast');
const latInput = document.getElementById('latitude');
const lonInput = document.getElementById('longitude');

showForecastBtn.addEventListener('click', function() {
    const lat = latInput.value;
    const lon = lonInput.value;
    if (lat && lon) {
        getForecast(lat, lon, forecastsDiv);
    }
    else {
        
    }
})