let darkTheme = document.querySelector(".input_check");
let themeIndicator = document.querySelector(".icon");
let colorH2 = document.querySelector(".colors");
let colorFulInH2 = document.querySelector(".colorful");
let body = document.querySelector("body");
let main = document.querySelector("main");
let nav = document.querySelector("header");
let input = document.querySelector("input");
let slide = document.querySelector(".slider");
let innerDiv = document.querySelectorAll(".divinner");
let button = document.querySelector("button");
let img = document.querySelector("img");


document.addEventListener("DOMContentLoaded", function () {
  if (darkTheme && themeIndicator) {
    darkTheme.addEventListener("change", function () {
      if (darkTheme.checked) {
        changeEverythingToLight();
      } else {
        themeIndicator.innerHTML =
          '<span class="material-symbols-outlined icon">dark_mode</span>';
      }
    });
  } else {
    console.error(
      "Checkbox or icon not found. Check your HTML structure and class names."
    );
  }
});
function changeEverythingToLight() {
  themeIndicator.innerHTML =
    '<span class="material-symbols-outlined icon">light_mode </span>';
  body.style.color = "black";
  body.style.backgroundColor = " #f9f9f9";
  nav.style.backgroundColor = " #f9f9f9";
  main.style.backgroundColor = " #f9f9f9";
  input.classList.add("inputStyleAfterLightMode");
  colorFulInH2.classList.add("colorss");
  colorH2.innerHTML = `Seeing the weather of the whole world with
  <span class="colorss"> Bright Weather!</span></h2>`;
  nav.style.color = "black";
  slide.classList.add("sliderForLight");

  for (inner of innerDiv) {
    inner.style.backgroundColor = "#B2EBF2";
    
  }
  
  
}
function changeEverythingToDefault() {
  themeIndicator.innerHTML =
    '<span class="material-symbols-outlined icon">dark_mode</span>';
  body.style.color = "";
  main.style.backgroundColor = "";
  body.style.backgroundColor = "";
  colorH2.innerHTML = `Seeing the weather of the whole world with
  <span class="colorful">Dark Weather!</span></h2>`;
  colorFulInH2.classList.remove("colorss");
  nav.style.color = "";
  nav.style.backgroundColor = "";
  nav.style.color = "";
  input.classList.remove("inputStyleAfterLightMode");
  slide.classList.remove("sliderForLight");
  
  for (inner of innerDiv) {
    inner.style.backgroundColor = "";
    
  }
}
darkTheme.addEventListener("click", function () {
  darkTheme.checked ? changeEverythingToLight() : changeEverythingToDefault();
});
let tempValue = document.querySelector(".temperature-value");
let lowTempValue = document.querySelector(".Low-temperture-value");
let highTempValue = document.querySelector(".High-temperture-value");
let humidityValue = document.querySelector(".Humidity-value");
let windSpeedValue = document.querySelector(".Wind-speed-value");
let visibilityValue = document.querySelector(".Visibility-value");
let locate = document.querySelector(".location");

button.addEventListener("click", () => {
  let inputCity = input.value;
  getData(inputCity);
});

const header = {
  headers: {
    Accept: "application/json",
    "X-RapidAPI-Key": "0e6ed78d9fmshc1d7ad822cf468fp1f020cjsn139147987250",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

let url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=`;

async function getData(inputCity) {
  try {
    let response = await axios.get(url + inputCity, header);
    console.log(response.data.max_temp);
    tempValue.innerHTML = response.data.temp;
    lowTempValue.innerHTML = response.data.min_temp;
    highTempValue.innerHTML = response.data.max_temp;
    humidityValue.innerHTML = response.data.humidity;
    windSpeedValue.innerHTML = response.data.wind_speed;
    visibilityValue.innerHTML = response.data.wind_degrees;
    locate.innerHTML = input.value;
    let minTemp = parseFloat(response.data.min_temp);
    let humidity = parseFloat(response.data.humidity);
    if (minTemp <= 2) {
      img.src = "other/mist.png";
      reload();
    } else if (minTemp >= -10 && minTemp <= 35 && humidity <= 50) {
      img.src = "other/clear.png";
      reload();
    } else if (minTemp >= 5 && minTemp <= 25 && humidity > 70) {
      img.src = "other/rain.png";
      reload();
    }
  } catch (err) {
    console.log(err);
    img.src = "other/404.png";
    locate.style.color = "red";
    locate.innerText = "404 ERROR";
    tempValue.innerHTML = "?";
    lowTempValue.innerHTML = "?";
    highTempValue.innerHTML = "?";
    humidityValue.innerHTML = "?";
    windSpeedValue.innerHTML = "?";
    visibilityValue.innerHTML = "?";
    reload();
  }
}
function reload() {
  setTimeout(() => {
    location.reload(true);
  }, 5000);
}
