import { Notify } from 'notiflix';
const countrySearchList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info")


export const fetchCountries = (name, url, filtr) => {
    //console.log(url + name + filtr)

    if (name == '') {
        countrySearchList.innerHTML = '';
    } else {
        fetch(url + name + filtr)
            .then(val => {
                if (val.status >= 400) {
                    countrySearchList.innerHTML = '';
                    countryInfo.innerHTML = '';
                    err = new Error('takie to to ')
                }
                else {
                    return val.json()
                }
            }).then(countryData => {
                countrySearchList.innerHTML = '';

                if ((countryData.length <= 10) && (countryData.length >= 2)) {
                    for (const country of countryData) {
                        countrySearchList.innerHTML += `<li><img src=${country.flag}> ${country.name}</li>`;
                    }

                }
                if ((countryData.length == 1)) {
                    const lastCountry = countryData[0];
                    let languages = [];
                    let population = '';
                    for (const lang of lastCountry.languages) {
                        languages.push(' ' + lang.name)
                    }
                    const popul = (lastCountry.population).toString().split('')
                    for (let i = 0; i < popul.length; i++) {
                        if ((popul.length - i) % 3) {
                            population += popul[i];
                        } else {
                            population += " " + popul[i];
                        }
                    }
                    countryInfo.innerHTML = `<div class="container"><div class="country-box"><img class = "country-bigflag" src=${lastCountry.flag}><span class="country-name">${countryData[0].name}</span></div> 
                <div class="country"><span class = "country-data">Capital:</span><span class = "country-values capital">${lastCountry.capital}<span></div>
                <div class="country"><span class = "country-data">Populaton:</span><span class = "country-values">${population}<span></div>
                <div class="country"><span class = "country-data">Languages:</span><span class = "country-values">${languages}<span></div></div>`;
                }
                if ((countryData.length > 10)) {
                    countryInfo.innerHTML = '';
                    Notify.info("Too many matches found. Please enter a more specific name.");
                }

            })

            .catch(err => {
                //console.error(err);
                if (name != '') {
                    Notify.failure("Oops, there is no country with that name")
                }
            });

    }
}