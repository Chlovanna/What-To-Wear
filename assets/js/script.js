const handleClick = () => {
  let city = document.querySelector("input").value;
  if (!city) return;

  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit1&appid=${APIKey}`;

  fetch(url)
    .then((data) => data.json())
    .then((data2) => {
      const { lat, lon } = data2[0];
      console.log("lat: ", lat, "lon: ", lon);
      let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

      fetch(url2)
        .then((data) => data.json())
        .then((data3) => {
          let uvi = data3.current.uvi;
          document.getElementById("current-weather").innerHTML = `
          <h2> ${new Date(
            data3.current.dt * 1000
          ).toLocaleDateString()} <span> <img src= 'http://openweathermap.org/img/wn/${
            data3.current.weather[0].icon
          }.png'></h2>
          <p> Tempuerature: ${data3.current.temp} </p>
          <p> Humidity: ${data3.current.humidity}</p>
          <p> Wind Speed: ${data3.current.wind_speed}</p>
          <p> UV index: <span style="background:${
            uvi > 8 ? "red" : uvi > 5 ? "yellow" : "green"
          };padding:5px;color:white;">${uvi}</span></p>`;
        });
    });
};
document.querySelector("#search-button").addEventListener("click", handleClick);

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
