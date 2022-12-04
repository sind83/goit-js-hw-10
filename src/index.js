import './css/styles.css';
import { debounce, isNull } from 'lodash';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const url = "https://restcountries.com/v2/name/";
let filtr;
//const filtr = '?fields=';
// const url = "https://restcountries.com/v2/name/peru"

const countryName = document.querySelector('#search-box');
const list = document.querySelector('ul');

let nameOfCountry;
//console.log(nameOfCountry);

countryName.addEventListener("input", debounce(() => {
    nameOfCountry = (countryName.value).trim();
    //console.log(nameOfCountry);
    filtr = '?fields=capital,population,languages,name,flag';
    if (list != null) {
        list.addEventListener("click", (even) => {
            const listEl = even.target;
            const nameOfchoise = listEl;
            even.stopPropagation();
            // console.log(list.childNodes)
            countryName.value = nameOfchoise.innerText;
            nameOfCountry = (countryName.value).trim();
            filtr = '?fullText=true';
            fetchCountries(nameOfCountry, url, filtr);
        });
    }

    fetchCountries(nameOfCountry, url, filtr);
    // console.log(list.childElementCount);
}, DEBOUNCE_DELAY));



