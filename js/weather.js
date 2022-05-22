const API_KEY = "1aa2dda453febbeb725262ecb72a45aa";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather h2:first-child")

        weather.innerText = `${data.name}
        ${data.weather[0].main} / ${data.main.temp}℃`;
    });
}

function onGeoError() {
    alert("Can't find your location. No weather info for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);