const $main = document.querySelector(".main");
const $sectionSearch = document.querySelector(".main .search");
const $sectionCountries = document.querySelector(".main .countries");
const $sectionDetails = document.querySelector(".main .details");
const $regionSelect = document.getElementById("regionSelect");
const $searchInput = document.querySelector(".search-input");
const $themeBtn = document.querySelector(".theme-btn");

async function getInfoCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const allData = await res.json();

  const specificData = allData.map((country) => {
    const languages = objectToArray(country.languages);
    const currencies = objectToArray(country.currencies);
    let nativeName = objectToArray(country.name.nativeName);
    if (nativeName) {
      nativeName = nativeName[nativeName.length - 2];
    }

    return {
      nativeName: country.name.nativeName ? nativeName : "None",
      topLevelDomain: country.tld ? country.tld : "None",
      currencies: currencies ? currencies : "None",
      languages: languages ? languages : "None",
      subregion: country.subregion ? country.subregion : "None",
      name: country.name.common ? country.name.common : "None",
      flag: country.flags.png ? country.flags.png : "None",
      flagSVG: country.flags.svg ? country.flags.svg : "None",
      region: country.region ? country.region : "None",
      population: country.population ? country.population : "None",
      capital: country.capital ? country.capital : "None",
      borders: country.borders ? country.borders : "None",
    };
  });

  console.log(specificData);
  return specificData;
}

async function generate() {
  const countries = await getInfoCountries();

  countries.forEach((country) => {
    $sectionCountries.innerHTML += `
            <div class="country">
                <div class="flag-container">
                    <img class="flag" src="${country.flag}" alt="${country.name} flag">
                    <img class="flagSVG hidden" src="${country.flagSVG}" alt="${country.name} flag">
                </div>
                <div class="info">
                    <h3 class="name">${country.name}</h3>
                    <p class="population ">${country.population}</p>
                    <p class="region">${country.region}</p>
                    <p class="capital">${country.capital}</p>
                    <p class="native-name hidden">${country.nativeName}</p>
                    <p class="languages hidden">${country.languages}</p>
                    <p class="subregion hidden">${country.subregion}</p>
                    <p class="top-level-domain hidden">${country.topLevelDomain}</p>
                    <p class="currencies hidden">${country.currencies}</p>
                    <p class="borders hidden">${country.borders}</p>
                </div>
            </div>
        `;
  });
}

function filterByRegion(region) {
  const $countries = document.querySelectorAll(".country");
  const $regions = document.querySelectorAll(".country .region");

  $countries.forEach((country, index) => {
    if (country.classList.contains("hidden"))
      country.classList.remove("hidden");

    let filtered = false;

    if ($regions[index].innerText == region) {
      filtered = true;
    }

    if (!filtered) country.classList.add("hidden");
  });

  if (region == "All") {
    $countries.forEach((country) => {
      if (country.classList.contains("hidden"))
        country.classList.remove("hidden");
    });
  }
}

function searchByName(name) {
  const $countries = document.querySelectorAll(".country");
  const $names = document.querySelectorAll(".country .name");

  let found = false;

  $countries.forEach((country, index) => {
    if (country.classList.contains("hidden"))
      country.classList.remove("hidden");

    if (name != "") {
      if (
        $names[index].innerText.toUpperCase().startsWith(name.toUpperCase())
      ) {
        console.log(country);
        found = true;
      } else {
        country.classList.add("hidden");
      }
    }
  });

  if (!found) {
    alert(`There is no country called "${name}"`);
  }
}

function cardAnimation() {
  const countries = document.querySelectorAll(".countries .country");
  countries.forEach((country) => {
    if (country.classList.contains("country")) {
      country.classList.remove("country");
      country.offsetWidth;
      country.classList.add("country");
    }
  });
}

function showAllCountries() {
  const countries = document.querySelectorAll(".countries .country");
  countries.forEach((country) => {
    if (country.classList.contains("hidden")) {
      country.classList.remove("hidden");
    }
  });
}

function changeTheme() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.offsetWidth;
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.body.offsetWidth;
    document.body.classList.add("dark");
  }
}

$regionSelect.addEventListener("change", () => {
  filterByRegion($regionSelect.value);
  cardAnimation();
});

$searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if ($searchInput.value != "") {
      searchByName($searchInput.value);
      cardAnimation();
    } else {
      showAllCountries();
    }
  }
});

$themeBtn.addEventListener("click", changeTheme);

generate();
