let store = eval(localStorage.cities) || [];

const loadHistory = () => {
  document.getElementById("history").innerHTML = "";
  if (store.length) {
    store.forEach((city) => {
      document.getElementById(
        "history"
      ).innerHTML += `<button class="storedCities text-white m-2 btn btn-primary" onclick="historyClick('${city}')"> ${city} </button><br>`;
    });
  }
};

const historyClick = (city) => {
  console.log(city, " Working...");
  document.getElementById("search-city").value = city;
  handleClick();
};

const clearHistory = () => {
  localStorage.clear();
  loadHistory();
};

loadHistory();

const handleClick = () => {
  let city = document.querySelector("input").value;
  if (!city) return;

  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit1&appid=${APIKey}`;

  fetch(url)
    .then((data) => data.json())
    .then((data2) => {
      const { lat, lon } = data2[0];
      console.log("lat: ", lat, "lon: ", lon);
      let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

      fetch(url2)
        .then((data) => data.json())
        .then((data3) => {
          if (!store.includes(city)) {
            store.push(city);
            localStorage.cities = JSON.stringify(store);
            loadHistory();
          }
          console.log(data3);
          let uvi = data3.current.uvi;
          let daily = data3.daily;

          document.getElementById("current-weather").innerHTML = `
            <h2> ${new Date(data3.current.dt * 1000).toLocaleDateString()} 
                  <span> <img src= 'https://openweathermap.org/img/wn/${
                    data3.current.weather[0].icon
                  }.png'>
                  </span>
            </h2>
            <p> Temperature: ${data3.current.temp} </p>
            <p> Humidity: ${data3.current.humidity}</p>
            <p> Wind Speed: ${data3.current.wind_speed}</p>
            <p> UV index: <span style="background:${
              uvi > 8 ? "red" : uvi > 5 ? "yellow" : "green"
            };padding:5px;color:white;">${uvi}</span></p>`;

          document.getElementById("forecast").innerHTML = "";
          daily.forEach((day, i) => {
            if (i > 4) return;
            document.getElementById("forecast").innerHTML += `
                <div class="col-md-2 bg-secondary forecast text-white m-2 p-4 rounded">
                    <h5 class="text-white"> ${new Date(
                      day.dt * 1000
                    ).toLocaleDateString()}
                        <span> 
                            <img src= 'https://openweathermap.org/img/wn/${
                              day.weather[0].icon
                            }.png'>
                        </span>
                    </h5>
                    <p>Temp: ${day.temp.day}</p>
                    <p>Humidity: ${day.humidity}</p>
                    <p>Wind Speed: ${day.wind_speed}</p>
                </div>
              `;
          });
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
