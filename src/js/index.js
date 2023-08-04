const $main = document.querySelector(".main");
const $sectionSearch = document.querySelector(".main .search");
const $sectionCountries = document.querySelector(".main .countries");
const $sectionDetails = document.querySelector(".main .details");
const $regionSelect = document.getElementById("regionSelect");
const $searchInput = document.querySelector(".search-input");
const $themeBtn = document.querySelector(".theme-btn");
const $searchIcon = document.querySelector(".search .search-icon");

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

  const $countries = document.querySelectorAll(".country");
  const $names = document.querySelectorAll(".country .name");
  const $flags = document.querySelectorAll(".country .flagSVG");
  const $populations = document.querySelectorAll(".country .population");
  const $regions = document.querySelectorAll(".country .region");
  const $capitals = document.querySelectorAll(".country .capital");
  const $subRegions = document.querySelectorAll(".country .subregion");
  const $currencies = document.querySelectorAll(".country .currencies");
  const $nativeName = document.querySelectorAll(".country .native-name");
  const $topLevelDomain = document.querySelectorAll(
    ".country .top-level-domain"
  );
  const $languages = document.querySelectorAll(".country .languages");
  const $borders = document.querySelectorAll(".country .borders");

  $countries.forEach((country, index) => {
    country.addEventListener("click", () => {
      goToDetailsPage();

      let arrayBorders = [];

      $borders.forEach((border) => {
        arrayBorders.push(border.innerHTML.split(","));
      });

      $sectionDetails.innerHTML = `
            <button class="back-btn">
                <i class="fa-solid fa-arrow-left-long"></i>
                <span class="back-text">Back</span>
            </button>
            <div class="country-details">
                <img class="flag" src="${$flags[index].src}" alt="Country flag">
                <div class="info">
                    <h3 class="name">${$names[index].innerHTML}</h3>
                    <div class="extra-info">
                        <div class="wrapper">
                            <p class="native-name">${$nativeName[index].innerHTML}</p>
                            <p class="population">${$populations[index].innerHTML}</p>
                            <p class="region">${$regions[index].innerHTML}</p>
                            <p class="sub-region">${$subRegions[index].innerHTML}</p>
                            <p class="capital">${$capitals[index].innerHTML}</p>
                        </div>
                        <div class="wrapper">
                            <p class="top-level-domain">${$topLevelDomain[index].innerHTML}</p>
                            <p class="currencies">${$currencies[index].innerHTML}</p>
                            <p class="languages">${$languages[index].innerHTML}</p>
                        </div>
                    </div>
                    <div class="border-countries">
                        <strong>Border Countries: </strong>
                        <ul class="list">
                            <li class="item">${arrayBorders[index][0]}</li>
                            <li class="item">${arrayBorders[index][1]}</li>
                            <li class="item">${arrayBorders[index][2]}</li>
                            <li class="item">${arrayBorders[index][3]}</li>
                            <li class="item">${arrayBorders[index][4]}</li>
                            <li class="item">${arrayBorders[index][5]}</li>
                            <li class="item">${arrayBorders[index][6]}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

      const $backBtn = document.querySelector(".back-btn");
      $backBtn.addEventListener("click", returnHomePage);

      clearUndefinedElements();
    });
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

function returnHomePage() {
  $sectionSearch.classList.remove("hidden");
  $sectionCountries.classList.remove("hidden");
  $sectionDetails.classList.add("hidden");
}

function goToDetailsPage() {
  $sectionSearch.classList.add("hidden");
  $sectionCountries.classList.add("hidden");
  $sectionDetails.classList.remove("hidden");
}

function objectToArray(object) {
  if (object) {
    const array = JSON.stringify(object).split('"');

    const newArray = [];
    array.map((e) => {
      if (
        e.length > 3 &&
        e != "symbol" &&
        e != "name" &&
        e != "official" &&
        e != "common"
      ) {
        newArray.push(e);
      }
    });

    return newArray;
  }
}

function clearUndefinedElements() {
  const itens = document.querySelectorAll(".border-countries .item");

  itens.forEach((item) => {
    if (item.innerHTML == "undefined") {
      item.remove();
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

$regionSelect.addEventListener("change", () => {
  filterByRegion($regionSelect.value);
  cardAnimation();
});

$searchIcon.addEventListener("click", () => {
  if ($searchInput.value != "") {
    searchByName($searchInput.value);
    cardAnimation();
  } else {
    showAllCountries();
  }
})

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