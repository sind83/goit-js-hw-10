import './css/styles.css';
import { debounce } from 'lodash';
import { fetchCountries, numbersOfCountries } from './fetchCountries';
import { Notify } from 'notiflix';


const DEBOUNCE_DELAY = 300;
const url = "https://restcountries.com/v2/name/";
let filtr;
//const filtr = '?fields=';
// const url = "https://restcountries.com/v2/name/peru"

const countryName = document.querySelector('#search-box');
const list = document.querySelector('ul');

let nameOfCountry;
//console.log(nameOfCountry);
const reg = /^-| {2,}|[^\w\d\- ]|\-{2,}| \-{1,}|\-{1,} {1,}/gi;

countryName.addEventListener("input", debounce(() => {
    const test = reg.test(countryName.value);
    if (countryName.value == '') {
        numbersOfCountries.innerHTML = ``;
    }
    if (test) {
        Notify.warning("Please use only letters, and no doubled space and '-' ");
        countryName.value = (countryName.value.replace(reg, ''))
    } else {

        nameOfCountry = ((countryName.value).trim());
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
    }
}, DEBOUNCE_DELAY));



