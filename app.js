

const darkTheme = document.querySelector(".input_check");
const themeIndicator = document.querySelector(".icon");
const colorH2 = document.querySelector(".colors");
const colorFulInH2 = document.querySelector(".colorful");
const body = document.querySelector("body");
const main = document.querySelector("main");
const nav = document.querySelector("header");
const input = document.querySelector("input");
const slide = document.querySelector(".slider");
const innerDiv = document.querySelectorAll(".divinner");
const button = document.querySelector("button");
const img = document.querySelector("img");

const tempValue = document.querySelector(".temperature-value");
const lowTempValue = document.querySelector(".Low-temperture-value");
const highTempValue = document.querySelector(".High-temperture-value");
const humidityValue = document.querySelector(".Humidity-value");
const windSpeedValue = document.querySelector(".Wind-speed-value");
const visibilityValue = document.querySelector(".Visibility-value");
const locate = document.querySelector(".location");

document.addEventListener("DOMContentLoaded", function () {
  if (darkTheme && themeIndicator) {
    darkTheme.addEventListener("change", function () {
      if (darkTheme.checked) {
        changeEverythingToLight();
      } else {
        changeEverythingToDefault();
      }
    });
  } else {
    console.error("Checkbox or icon not found. Check your HTML structure and class names.");
  }
});

function changeEverythingToLight() {
  themeIndicator.innerHTML = '<span class="material-symbols-outlined icon">light_mode</span>';
  body.style.color = "black";
  body.style.backgroundColor = "#f9f9f9";
  nav.style.backgroundColor = "#f9f9f9";
  main.style.backgroundColor = "#f9f9f9";
  input.classList.add("inputStyleAfterLightMode");
  colorFulInH2.classList.add("colorss");
  colorH2.innerHTML = `Seeing the weather of the whole world with <span class="colorss">Bright Weather!</span>`;
  nav.style.color = "black";
  slide.classList.add("sliderForLight");

  for (const inner of innerDiv) {
    inner.style.backgroundColor = "#B2EBF2";
  }
}

function changeEverythingToDefault() {
  themeIndicator.innerHTML = '<span class="material-symbols-outlined icon">dark_mode</span>';
  body.style.color = "";
  main.style.backgroundColor = "";
  body.style.backgroundColor = "";
  colorH2.innerHTML = `Seeing the weather of the whole world with <span class="colorful">Dark Weather!</span>`;
  colorFulInH2.classList.remove("colorss");
  nav.style.color = "";
  nav.style.backgroundColor = "";
  nav.style.color = "";
  input.classList.remove("inputStyleAfterLightMode");
  slide.classList.remove("sliderForLight");

  for (const inner of innerDiv) {
    inner.style.backgroundColor = "";
  }
}

darkTheme.addEventListener("click", function () {
  darkTheme.checked ? changeEverythingToLight() : changeEverythingToDefault();
});

button.addEventListener("click", () => {
  let inputCity = input.value;
  getData(inputCity);
});

const header = {
  headers: {
    Accept: "application/json",
    "X-RapidAPI-Key": "e6a6b3985fmsh5491345f2fb2943p10b42djsn2f6fe38f6ae9",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};


async function getData(inputCity) {
  try {
    const apiKey = "W3HKV2YHGNRNN66UGXDWXKWS9";
    let response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity}?unitGroup=metric&key=${apiKey}&contentType=json`);
    console.log(response.data);
    tempValue.innerHTML = response.data.currentConditions.temp + "°";
    lowTempValue.innerHTML = response.data.days[0].tempmin + "°";
    highTempValue.innerHTML = response.data.days[0].tempmax + "°";
    humidityValue.innerHTML = response.data.currentConditions.humidity + "%";
    windSpeedValue.innerHTML = response.data.days[0].windspeed;
    visibilityValue.innerHTML =response.data.days[0].visibility;
    locate.innerHTML = input.value;
    let minTemp = parseFloat(response.data.min_temp);
    let humidity = parseFloat(response.data.humidity);
    if (minTemp <= 2) {
      let snowAudio = document.querySelector(".snow");
      snowAudio.play();
      img.src = "other/mist.png";
      reload();
    } else if (minTemp >= -10 && minTemp <= 35 && humidity <= 50) {
      let clearAudio = document.querySelector(".clear");
      clearAudio.play();
      img.src = "other/clear.png";
      reload();
    } else if (minTemp >= 5 && minTemp <= 25 && humidity > 70) {
      let rainAudio = document.querySelector(".rain");
      rainAudio.play();
      reload();
    }
  } catch (err) {
    console.log(err);
    locate.style.color = "red";
    locate.innerText = "404 ERROR";
    tempValue.innerHTML = "?";
    lowTempValue.innerHTML = "?";
    highTempValue.innerHTML = "?";
    humidityValue.innerHTML = "?";
    windSpeedValue.innerHTML = "?";
    visibilityValue.innerHTML = "?";
    // reload();
  }
}

// function reload() {
//   setTimeout(() => {
//     location.reload(true);
//   }, 7000);
// }
