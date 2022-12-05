import './css/styles.css';
// import { fetchCountries } from './fetchCountries';
import { countriesList, countryCard } from './templates';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';


const refs = {
  inputEl: document.getElementById('search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
let name = '';

refs.inputEl.addEventListener(
  'input',
  debounce(onInputElSearch, DEBOUNCE_DELAY)
);

function onInputElSearch(e) {
 // Метод trim() удаляет пробелы с обеих сторон строки
  name = e.target.value.trim();
  // Якщо поле пошуку чисте, то інформація про країну зникає.
  if (name === '') {
    clearPage();
  }

  fetchCountries(name)
    .then(renderInputDate)
    .catch(error => {
      Notify.warning('Oops, there is no country with that name');
      clearPage();
    })
    // .finally(refs.inputEl.reset());
}

function renderInputDate(countries) {
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    } else if (countries.length <= 10) {renderCountriesData
    } else if (countries.length === 1) {renderCountyCard }
};

 // .then(renderCountriesData)
  // .then(renderCountyCard)

function fetchCountries(name) {
    const url = (' https://restcountries.com/v3.1/name/');
  const apiAndpoints = '?fields=name,capital,population,flags,languages';
  return fetch(`${url}${name}${apiAndpoints}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      };
      return response.json();
    })
}
    
function renderCountriesData(countries) {
  const markup = countries.map(country =>
  countriesList(country)).join('');
  refs.countryListEl.innerHTML = markup;
}

function renderCountyCard(countries) {
  const markup = countries.map(country =>
  countryCard(country)).join('');
  refs.countryInfoEl.innerHTML = markup;
}

function clearPage() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
  return;
}


// fetchCountries(name)
//     .then(countries => countriesList(countries))
//     .catch(error => {
//       Notify.warning('Oops, there is no country with that name');
//       clearPage();
//     });
//   // .finally(refs.inputEl.reset());
// };

//  function renderInputDate(countries) {
//     if (countries.length > 10) {
//       Notify.info('Too many matches found. Please enter a more specific name.');
//     }
   
//    if (countries.length <= 10) {
//       renderCountriesData();
//    }

//    if (countries.length === 1) {
//       renderCountyCard();
//     }
// };


