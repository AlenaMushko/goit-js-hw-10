import './css/styles.css';
import { fetchCountries } from './fetchCountries';
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
    e.preventDefault();
  name = e.target.value;
  // Якщо поле пошуку чисте, то інформація про країну зникає.
  if (name === '') {
    clearPage();
  }
  fetchCountries({name})
    .then(  countries => { 
        const markup = countries.map(country => countriesList(country))
        .join('') ;
          refs.countryListEl.innerHTML = markup;
    }
        
    );

}




//   fetchCountries(name)
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

// function renderCountriesData(countries) {
//   const markup = countries.map(country => {
//     countriesList(country)
//   }).join('');
//   refs.countryListEl.innerHTML = markup;
//   console.log(countries);
// }

// function renderCountyCard(country) {
//   const markup = countryCard(country).join('');
//   refs.countryInfoEl.innerHTML = markup;
// }

// function clearPage() {
//   refs.countryListEl.innerHTML = '';
//   refs.countryInfoEl.innerHTML = '';
//   return;
// }

