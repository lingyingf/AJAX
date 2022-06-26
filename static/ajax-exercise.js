'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch("/fortune")
    .then((response) => response.text())
    .then((responseData) => {
      document.querySelector("#fortune-text").innerHTML = responseData
    })
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info

  fetch(`/weather.json?zipcode=${zipcode}`)
    .then((response) => response.json())
    .then((jsonData) => {
      document.querySelector("#weather-info").innerHTML = jsonData.forecast;
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function printResult(result) {
  if (result.code === "OK") {
    document.querySelector('#order-status').classList.remove('order-error');
    document.querySelector("#order-status").innerHTML = `<p>${result.msg}</p>`;
  }
  else {
    document.querySelector('#order-status').classList.add('order-error');
    document.querySelector("#order-status").innerHTML = `<p><b>${result.msg}</b></p>`;
  }
}


function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  
  const formInputs = {
    type: document.querySelector("#melon-type-field").value,
    qty: document.querySelector("#qty-field").value,
  };
  
  fetch("/order-melons.json", {
    method: "POST",
    body: JSON.stringify(formInputs),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then(printResult);
    
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)


}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
