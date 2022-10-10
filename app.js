//*=========================================================
//*                     FLAG-APP
//*=========================================================
let isError = false;

//! Fetching
const fetchCountrySelectName = async () => {
  const url = "https://restcountries.com/v3.1/all";

  try {
    const res = await fetch(url);
    if (!res.ok) {
      renderError();
    }

    const data = await res.json();
    return renderNames(data);
  } catch (err) {
    console.log(err);
  }
};

const fetchCountryName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        name == "Please select your country" || renderError();
      }
      return res.json();
    })
    .then((data) => {
      if (name.toLowerCase() === "Hong Kong") {
        difData = data[0];
        data = [];
        data.push(difData);
      } else if (name.toLowerCase() === "china") {
        difData = data[1];
        data = [];
        data.push(difData);
      } else if (name.toLowerCase() === "Macau") {
        difData = data[2];
        data = [];
        data.push(difData);
      } else if (name.toLowerCase() === "Taiwan") {
        difData = data[3];
        data = [];
        data.push(difData);
      }

      return renderCountries(data);
    })
    .catch((err) => console.log(err));
};

//! Error handling
const renderError = () => {
  const body = document.querySelector("body");
  const h1 = document.querySelector("h1");
  const countryDiv = document.querySelector(".countries");
  const select = document.getElementById("select");
  body.setAttribute("class", "error");
  h1.innerText = "Countries can not fetched";
  countryDiv.style.display = "none";
  select.style.display = "none";
};

//!  Rendering
const renderNames = (data) => {
  const select = document.getElementById("select");

  let names = data.map((data) => data.name.common).sort();

  names.forEach((name) => {
    select.innerHTML += `
    <option value="${name}">${name}</option>
    `;
  });
};

const renderCountries = (data) => {
  const countryDiv = document.querySelector(".countries");
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
    maps: { googleMaps },
  } = data[0];

  countryDiv.innerHTML = `
<div class="card bg-dark text-light mx-auto m-3 shadow-lg" style="width: 18rem">
<img src="${svg}" class="card-img-top" alt="..." />
<div class="card-body">
<h5 class="card-title">${common}</h5>
<p class="card-text">${region}</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item bg-dark text-light">
<i class="fas fa-lg fa-landmark"></i> ${capital}
</li>
<li class="list-group-item bg-dark text-light">
<i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
</li>
<li class="list-group-item bg-dark text-light">
<i class="fas fa-lg fa-money-bill-wave"></i>
${Object.values(currencies).map((item) => Object.values(item) + " ")}
</li>
</ul>
<div class="card-body text-center">
<a
href="${googleMaps}"
target="_blank"
class="card-link btn btn-info"
>Google Maps</a
>
</div>
</div>
`;
};

fetchCountrySelectName();

select.addEventListener("change", (e) => {
  if (e.target === "Please select a country") {
    isError = false;
  }
  fetchCountryName(e.target.value);
});
