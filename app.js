const init = () => {
  let button = document.querySelector('#getData');
  button.addEventListener('click', getLatLong);
}

const getLatLong = () => {
  let zip = document.querySelector('#zip').value;
  console.log(zip);
  let url1 = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zip}&username=gbatista`;
  sendReq(url1, 'location'); // lat and long
}

const parse_location = (data) => {
  let lat = data['postalCodes'][0]['lat'];
  let long = data['postalCodes'][0]['lng'];
  console.log(lat);
  console.log(long);
  let placename = data['postalCodes'][0]['placeName'];
  let url = `http://api.geonames.org/findNearByWeatherJSON?lat=${lat}&lng=${long}&username=gbatista`;
  sendReq(url, 'weather', placename);
}

const sendReq = (url, type, placename) => {
  let xhr = new XMLHttpRequest();
  xhr.open('get', url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);
      if (type == 'location') {
        parse_location(data);
      } else {
        console.log(data);
        parse_data(data, placename);
      }
    }
  };
  xhr.send();

}
const parse_data = (data, placename) => {
  let place = document.querySelector('#city');
  place.textContent = placename;
  //   console.log(data);
  let tempC = parseFloat(data['weatherObservation']['temperature']);
  let windspeed = parseFloat(data['weatherObservation']['windSpeed']);

  let tempF = (tempC * 9) / 5 + 32;
  let temp = document.querySelector('#temp');

  let status = document.getElementById('#status');
  if (tempF <= 34) {
    temp.innerHTML =
      tempF + ` degrees Fahrenheit Temperature: <img src="cold.png">`;
  } else if (tempF >= 83) {
    temp.innerHTML =
      tempF + ` degrees Fahrenheit Temperature: <img src="hot.jpg">`;
  } else {
    temp.textContent = tempF + ' degrees Fahrenheit';
  }
  let wind = document.querySelector('#wind');
  if (windspeed > 15) {
    wind.innerHTML = `${windspeed} Windspeed<img src="wind.png">`;
  } else {
    wind.innerHTML = `${windspeed} Windspeed`;
  }

}
window.onload = init();
