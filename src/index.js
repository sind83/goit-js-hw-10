import './css/styles.css';
import { debounce, isNull } from 'lodash';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const url = "https://restcountries.com/v2/name/";
const filtr = '?fields=capital,population,languages,name,flag';
//const filtr = '?fields=';
// const url = "https://restcountries.com/v2/name/peru"

const countryName = document.querySelector('#search-box');
const list = document.querySelector('ul');

let nameOfCountry;
//console.log(nameOfCountry);

countryName.addEventListener("input", debounce(() => {
    nameOfCountry = (countryName.value).trim();
    //console.log(nameOfCountry);
    if (list != null) {
        console.log("OKOKOK");
        list.addEventListener("click", (even) => {
            const listEl = even.target;
            // even.target
            const nameOfchoise = listEl//.childNodes[1]
            //console.log("kliknięto w liste", nameOfchoise);

            //even.stopPropagation();
           // console.log(list.childNodes)
            countryName.value = nameOfchoise.innerText;
            nameOfCountry = (countryName.value).trim();
            fetchCountries(nameOfCountry, url, filtr);
        });
    }

    // list.children
    fetchCountries(nameOfCountry, url, filtr);
    console.log(list.childElementCount);
}, DEBOUNCE_DELAY));



