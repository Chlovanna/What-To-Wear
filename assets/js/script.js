const handleClick = ()=>{
  let city = document.querySelector('input').value;
  if(!city) return;

  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit1&appid=${APIKey}`;

fetch(url).then(data=>data.json()).then(({lat,lon})=>{
  let url2 = 
  fetch
});
}
document.querySelector('#search-button').addEventListener('click', handleClick);





// Current weather data
//  "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&APPID=" +
//     APIKey;

//   UV Index
//    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
//     APIKey +
//     "&lat=" +
//     lt +
//     "&lon=" +
//     ln;  

//     5 day forecast
//     "https://api.openweathermap.org/data/2.5/forecast?id=" +
//     cityid +
//     "&appid=" +
//     APIKey;
