const weather = document.querySelector('span.js-weather');

const COORDS = 'coords';
const WEATHER_API_KEY = 'bd6f35379b7bdc6274cce79399a8eb31';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';

function getWeather(lat,lng){
    const params = `lon=${lng}&lat=${lat}&APPID=${WEATHER_API_KEY}`
    const url = `${WEATHER_API_URL}${params}`
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
        console.log(json.main.temp);
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`;
    });
}

function saveCoord(coordObj){
    localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoord(coordsObj);
    getWeather(latitude,longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);

}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }{
        // getWeather();
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();