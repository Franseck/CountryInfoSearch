const countries = document.querySelector(".countries");
const searchInput = document.querySelector("#search");
const search = document.querySelector("#searchDiv");


const callCountry = async () => {
  try {
    const url = `https://restcountries.com/v3.1/all`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    searchCountry(data);
    CountryInfo(data);
  } catch (error) {
    console.log(error);
  }
};

callCountry();

const searchCountry = (data) => {
  searchInput.addEventListener("input", (e) => {
    search.innerHTML = "";

    const query = searchInput.value.toLowerCase();

    const filteredCountries = data.filter(
      ({ name: { common } }) =>
        common.toLowerCase().includes(query)
    );

    if (filteredCountries.length === 1) {
      search.innerHTML = "";
      CountryInfo(data, filteredCountries[0]);
      searchInput.value = filteredCountries[0].name.common;
      return;
    }

    filteredCountries.forEach((item) => {
      const newSpan = document.createElement("span");
      newSpan.textContent = item.name.common;
      newSpan.style.backgroundColor = "moccasin";
      newSpan.style.borderRadius = "0.5rem";
      newSpan.style.textAlign="center"
      newSpan.style.marginTop = "1rem";
      search.appendChild(newSpan);

      newSpan.addEventListener("click", () => {
        search.innerHTML = "";
        CountryInfo(data, item);
        searchInput.value = item.name.common;
      });
    });
  });
};

const CountryInfo = (data, country = null) => {
  if (!country) {
    const random = Math.floor(Math.random() * data.length);
    country = data[random];
  }
  countries.innerHTML = `   
  <div class="card shadow-lg" style="width: 25rem">
            <img src="${country.flags.png }" class="card-img-top " alt="flag" />
            <div >
              <h1 class="p-2 text-center">${country.name.common}</h1>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item ">
               <span class="fw-bold"> Region: </span> ${country.region }
              </li>
              <li class="list-group-item">
                <span class="fw-bold"> Capitals: </span>${country.capital}
              </li>
              <li class="list-group-item">
                <span class="fw-bold"> Languages: </span>${Object.values(country.languages )}
              </li>
              <li class="list-group-item">
                <span class="fw-bold"> Currencies: </span>${Object.values(country.currencies ).map(           (currency) => `${currency.name} (${currency.symbol})` )}
              </li>
              <li class="list-group-item">
              <span class="fw-bold"> Population: </span>${country.population }
            </li>
              <li class="list-group-item">
              <span class="fw-bold"> Borders: </span>${country.borders || null}
            </li>
            </li>
            <li class="list-group-item">
            <span class="fw-bold"> Map:</span> <a href="${
              country.maps.googleMaps }" target='_blank'> Go to google map</a> </li>
            </ul>
          </div>`;
};
