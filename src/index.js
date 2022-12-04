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
  // e.preventDefault();
  //  ?
  name = e.target.value.trim();
  // Якщо поле пошуку чисте, то інформація про країну зникає.
  if (name === '') {
    clearPage();
  }
  // Метод trim() удаляет пробелы с обеих сторон строки
  // Виконай санітизацію введеного рядка методом trim(),
  // ?
  fetchCountries(name)
    .then(renderInputDate)
    .catch(error => {
      Notify.warning('Oops, there is no country with that name');
      clearPage();
    })
    .finally(refs.inputEl.reset());
}

function renderInputDate(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if ( countries.length <= 10) {
    renderCountriesData();
  } else if (countries.length === 1) {
    renderCountyCard();
  }
}


function renderCountriesData({ countries }) {
  const markup = country.map(country => {
    return countriesList.json('');
  });
  refs.countryListEl.innerHTML = markup;
}

function renderCountyCard({ country }) {
  const markup = countryCard.json('');
  refs.countryInfoEl.innerHTML = markup;
}

function clearPage() {
   refs.countryListEl.innerHTML = '';
    refs.countryInfoEl.innerHTML = '';
    return;
}


