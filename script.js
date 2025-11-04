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
    }, 1500);
}

function createForecastDiv(forecast, parentDiv) {
    if (parentDiv.childElementCount > 0) {
        parentDiv.innerHTML = '';
    }

    const forecastDiv = document.createElement('div');
    const leftDiv = document.createElement('div');
    const cityNameH2 = document.createElement('h2');
    const temperatureP = document.createElement('p');
    const descriptionP = document.createElement('p');
    const sunrise = document.createElement('p');
    const sunset = document.createElement('p');
    const image = document.createElement('img');
    
    cityNameH2.innerText = forecast.city_name;
    temperatureP.innerText = `Температура: ${forecast.temp}°C`;
    sunrise.innerText = `Восход: ${forecast.sunrise}`;
    sunset.innerText = `Закат: ${forecast.sunset}`;
    descriptionP.innerText = forecast.weather.description;
    image.src = `https://cdn.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`;
    changeBackgroundColor(forecast.weather.code);

    forecastDiv.className = 'forecast';
    leftDiv.className = 'forecast-left';
    cityNameH2.className = 'city-name';
    temperatureP.className = 'temperature-p';
    descriptionP.className = 'weather-description';
    image.className = 'weather-img';
    
    cityNameH2.appendChild(image);
    leftDiv.appendChild(cityNameH2);
    leftDiv.appendChild(descriptionP);
    leftDiv.appendChild(temperatureP);
    leftDiv.appendChild(sunrise);
    leftDiv.appendChild(sunset);
    forecastDiv.appendChild(leftDiv);
    parentDiv.appendChild(forecastDiv);
}

function changeBackgroundColor(code) {
    code = String(code);
    document.body.style.backgroundSize = 'cover';
    switch (code[0]) {
        case '2':
            document.body.style.backgroundImage ='url(images/ThunderstormWithRain.jpg)';
            break;
        case '3':
            document.body.style.backgroundImage ='url(images/Drizzle.jpg)';
            break;
        case '5':
            document.body.style.backgroundImage ='url(images/Rain.jpg)';
            break;
        case '6':
            document.body.style.backgroundImage ='url(images/Snow.jpg)';
            break;
        case '7':
            document.body.style.backgroundImage ='url(images/Fog.jpg)';
            break;
        case '8':
            document.body.style.backgroundImage ='url(images/Sunny.jpg)';
            break;
        default:
            document.body.style.backgroundImage ='url(images/cat-dance.gif)';
        }
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
        alert('Запоните поля.')
    }
})

const fastWeatherBtns = document.getElementsByClassName('fast-weather-city');
for (const btn of fastWeatherBtns) {
    btn.addEventListener('click', function() {  
        getForecast(btn.getAttribute('lat'), btn.getAttribute('lon'), forecastsDiv)
    })
}