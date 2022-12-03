import './css/styles.css';
import { debounce } from 'lodash';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const url = "https://restcountries.com/v2/name/";
const filtr = '?fields=capital,population,languages,name,flag';
// const url = "https://restcountries.com/v2/name/peru"

const countryName = document.querySelector('#search-box');

let nameOfCountry;
//console.log(nameOfCountry);

countryName.addEventListener("input", debounce(() => {
    nameOfCountry = (countryName.value).trim();
    //console.log(nameOfCountry);
    fetchCountries(nameOfCountry, url, filtr);
}, DEBOUNCE_DELAY));

