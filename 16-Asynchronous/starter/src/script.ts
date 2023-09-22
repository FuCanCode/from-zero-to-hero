//////////////////////////////////////////
///NEW API: https://countries-api-836d.onrender.com/countries/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/* const displayCountry = function (country: string) {
  const request = new XMLHttpRequest(); // Old way
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  console.time('t1');
  request.addEventListener('load', function () {
    console.timeEnd('t1');
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const flag = data.flags.png;
    const name = data.name.common;
    const region = data.region;
    const population = (+data.population / 1000000).toFixed(2);
    const languages = Object.values(data.languages).join(', ');
    const currency: any = Object.values(data.currencies)[0];

    const html = `<article class="country">
  <img class="country__img" src="${flag}" />
  <div class="country__data">
    <h3 class="country__name">${name}</h3>
    <h4 class="country__region">${region}</h4>
    <p class="country__row"><span>👫</span>${population} Million</p>
    <p class="country__row"><span>🗣️</span>${languages}</p>
    <p class="country__row"><span>💰</span>${Object.values(currency)
      .reverse()
      .join(' ')}</p>
  </div>
</article>`;
    countriesContainer?.insertAdjacentHTML('afterbegin', html);
  });
};

displayCountry('thailand');
displayCountry('germany');
displayCountry('indonesia');
displayCountry('canada');
 */
const renderData = function (dataObject: any, className: string = '') {
  const flag = dataObject.flags.png;
  const name = dataObject.name.common;
  const region = dataObject.region;
  const population = (+dataObject.population / 1000000).toFixed(2);
  const languages = Object.values(dataObject.languages).join(', ');
  const currency: any = Object.values(dataObject.currencies)[0];

  const html = `<article class="country ${className}">
<img class="country__img" src="${flag}" />
<div class="country__data">
  <h3 class="country__name">${name}</h3>
  <h4 class="country__region">${region}</h4>
  <p class="country__row"><span>👫</span>${population} Million</p>
  <p class="country__row"><span>🗣️</span>${languages}</p>
  <p class="country__row"><span>💰</span>${Object.values(currency)
    .reverse()
    .join(' ')}</p>
</div>
</article>`;
  countriesContainer?.insertAdjacentHTML('beforeend', html);
  console.log(dataObject);
  return dataObject;
};

/* const displayCountryAndNeighbour = function (country: string) {
  const initRequest = function (URL: string): XMLHttpRequest {
    const request = new XMLHttpRequest(); // Old way
    request.open('GET', URL);
    request.send();
    return request;
  };

  const request = initRequest(`https://restcountries.com/v3.1/name/${country}`); // Old way

  console.time('t1');
  request.addEventListener('load', function () {
    console.timeEnd('t1');
    const [data] = JSON.parse(this.responseText);
    console.log(data.borders);
    renderData(data);

    // Render each neighbour
    const neighbours: string[] = data.borders;
    if (neighbours.length <= 0) return;

    neighbours.forEach(neighbour => {
      const requestN = initRequest(
        `https://restcountries.com/v3.1/alpha/${neighbour}`
      );

      requestN.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        renderData(data, 'neighbour');
      });
    });
  });
};

displayCountryAndNeighbour('norway'); */

const getCountryData = function (country: string) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderData(data[0]))
    .then(obj =>
      obj.borders.forEach((neighbour: string) => {
        fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
          .then(response => response.json())
          .then(data => renderData(data[0]));
      })
    );
};

getCountryData('germany');
