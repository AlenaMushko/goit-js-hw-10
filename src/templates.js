export  function countriesList({ name, flags }) {
  return `
    <li class="country-item"><img class="country-img" src="${flags.svg}" alt="flag of ${name.official}" width="60"/>
        <p class="counry-title">${name.official}</p>
      </li>
    `;
};

export  function countryCard({ name, capital, population, flags, languages }) {
  return `
  <div>
  <div class="card-wrap">
  <img class="card-img" src="${flags.svg}" alt="flag of ${name.official}" width="140" />
  <p class="card-title">${name.official}</p>
</div>
<p class="card-text">Capital: ${capital}</p>
<p class="card-text">Population: ${population}</p>
<p class="card-text">Languages: ${Object.values(
        languages,
      )}</p>
</div>
  `;
}