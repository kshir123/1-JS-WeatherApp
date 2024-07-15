const apiKey = '1bf9340c42be212dbad705254cc3a66a';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`;

const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon =document.querySelector('.weather-icon');

searchButton.addEventListener('click', ()=>{
  const city = searchBox.value;
  checkWeather(city);
})

async function checkWeather(city) {
  const response = await fetch(apiUrl + city);

  if(response.status === 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    let data = await response.json();

    //Appending details to the individual fields
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + ' °C';
    document.querySelector('.humidity').innerHTML = data.main.humidity +' %';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    // Appending icons as per weather condition
    if(data.weather[0].main === 'Clouds') {
      weatherIcon.src = 'images/clouds.png' ;
    } else if(data.weather[0].main === 'Clear') {
      weatherIcon.src = 'images/clear.png' ;
    } else if(data.weather[0].main === 'Rain') {
      weatherIcon.src = 'images/rain.png' ;
    } else if(data.weather[0].main === 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png' ;
    } else if(data.weather[0].main === 'Mist') {
      weatherIcon.src = 'images/mist.png' ;
    }

    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather').style.display = 'block';
  }
}
