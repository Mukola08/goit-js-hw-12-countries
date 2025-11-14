import { debounce } from "lodash";

import {
  alert,
  defaultModules,
  success,
  error,
  info,
} from "@pnotify/core/dist/PNotify.js";

import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";

import "@pnotify/core/dist/BrightTheme.css";

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";

defaultModules.set(PNotifyMobile, {});

import fetchCountries from "./fetchCountries";

const appInput = document.querySelector(".app-input");
const appList = document.querySelector(".app-list");
const appDiv = document.querySelector(".app-div");

appInput.addEventListener("input", debounce(searchCountry, 500));

function searchCountry(evt) {
  appList.innerHTML = "";
  appDiv.innerHTML = "";
  const countryName = evt.target.value.trim();
  fetchCountries(countryName).then((res) => {
    if (res.length > 10) {
      appList.innerHTML = "";
      appDiv.innerHTML = "";
      errorMessage();
      return;
    }
    if (res.length > 1 && res.length <= 10) {
      appList.innerHTML = "";
      appDiv.innerHTML = "";
      const countryName = res
        .map((country) => `<li class="app-item">${country.name.common}</li>`)
        .join("");
      appList.innerHTML = countryName;
      return;
    }
    if (res.length === 1) {
      appList.innerHTML = "";
      appDiv.innerHTML = "";
      const countryInfo = res.map(
        ({ name, capital, population, flags, languages }) => {
          const values = Object.values(languages);

          return (appDiv.innerHTML = `<h1 class="app-cname">${name.common}</h1>
    <div class="app-box">
    <div class="app-cinfo">
    <h3 class="app-subtitle">Capital: <span
    class="app-subtitle-info">${capital}</span></h3>
    <h3 class="app-subtitle">Population: <span
    class="app-subtitle-info"></span>${[population]}</h3>
    <h3 class="app-subtitle">languages:
    <ul class = "app-changuages">
    ${values.map(languages => `<li class = "clanguages-item">
      <h3 class="clanguages-subtitle">${languages}</h3>
      </li>`).join("")}
            </ul>
            </h3>
            </div>
            <div class="app-cimage"> 
            <img src="${
              flags.png
            }" alt="Country Flag." class="app-cimg" width="400" height="300"> 
            </div>
             </div>`).join("");
        }
      );
      console.log(countryInfo);
      return
    }
  });
}


function errorMessage() {
  error({
    title: "Oh No!",
    text: "Write the name of the country more precisely!",
    deley: 1000,
  });
}
