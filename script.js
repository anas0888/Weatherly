const apikey = 'ed7ceb7e93ce00f7104796b3c02fedb7';
// const cityname = 'srinagar'
// var lat ,lon = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${apikey}`;

// const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apikey}`



const searchBox = document.querySelector('.search input')
const searchButon = document.querySelector('.search button')

var weatherIcon = document.querySelector('.weather-icon')
var cityElement = document.querySelector('.city')
var tempElement = document.querySelector('.temp')
var humidityElement = document.querySelector('.humidity')
var windElement = document.querySelector('.wind')
var weatherDetails = document.querySelector('.weatherDetails')


async function checkWeather(city) {
    if(!city){
        weatherDetails.style.display = 'none'
        return console.log("error");
        ;
    }

const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`
const geoRes = await fetch(geoUrl);
const geoData = await geoRes.json();
if(geoData.length === 0 ){
    weatherDetails.style.display = 'none';
    return alert("city not found");
}
const lat  = geoData[0].lat;
const lon = geoData[0].lon;

 const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
 const result = await fetch(weatherURL);
 const data = await result.json();


    if (data.cod === 200){
        weatherDetails.style.display = 'block';
        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp)+'°C'
     humidityElement.innerHTML = data.main.humidity + '%';
     windElement.innerHTML = data.wind.speed + 'km/h'
    
      if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/cloud_computing.png';
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-787W66w2lXf-Dw4GOmxthMd17JDHMXe0aw&s';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'https://png.pngtree.com/png-vector/20191118/ourmid/pngtree-rain-icon-creative-design-template-png-image_1998625.jpg';
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = 'https://png.pngtree.com/png-vector/20201128/ourmid/pngtree-dark-clouds-and-raindrops-png-image_2478510.jpg';
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'https://img.freepik.com/free-photo/white-cloud-smoke-black-background-design-element-abstract-texture_90220-2995.jpg?semt=ais_hybrid&w=740&q=80';
        } else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = 'https://img.freepik.com/free-photo/3d-render-defocussed-snowy-tree-landscape_1048-14924.jpg?semt=ais_hybrid&w=740&q=80';
        }
    } else {
        
        weatherDetails.style.display = 'none';
        alert("City not found!");
    }
}
searchButon.addEventListener('click',()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keypress',(e) => {
    if (e.key=== 'Enter'){
        checkWeather(searchBox.value)
        }
});





    
