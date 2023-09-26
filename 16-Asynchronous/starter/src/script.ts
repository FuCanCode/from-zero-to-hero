//////////////////////////////////////////
///NEW API: https://countries-api-836d.onrender.com/countries/

const btn = document.querySelector('.btn-country') as HTMLButtonElement;
const countriesContainer = document.querySelector(
  '.countries'
) as HTMLDivElement;

interface GeocodeResponse {
  country: string;
  city: string;
  distance: number;
}

const renderError = function (msg: string) {
  countriesContainer?.insertAdjacentText('beforeend', msg);
};

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

const getJSON = function (URL: string, errMsg = 'Something went wrong') {
  return fetch(URL).then(
    response => {
      if (!response.ok) {
        errMsg = response.status === 404 ? "Couldn't find country" : errMsg;
        throw new Error(`${errMsg} (${response.status})! Please try again!`);
      }
      return response.json();
    },
    err => console.log(err)
  );
};

const getCountryData = function (country: string) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`)
    .then(data => {
      renderData(data[0]);

      const neighbours: string[] = data[0].borders;
      if (!neighbours) console.log(`${data[0].name.common} has no neighbours!`);

      return neighbours;
    })
    .then(neighbours => {
      if (!neighbours) return;
      neighbours.forEach((neighbour: string) => {
        getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`).then(
          data => renderData(data[0], 'neighbour')
        );
      });
    })
    .catch((err: ErrorEvent) => {
      console.error(`${err.type} 🤯`);
      renderError(`Something went wrong 🤯🤯🤯 ${err.message} Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = '1';
    });
};

// btn.addEventListener('click', () => {
//   getCountryData('australia');
// });

// getCountryData('chad');

////////////////////////////////////////
///// Challenge 1

const testData = [
  [52.508, 13.381], // Berlin
  [19.037, 72.873], // Mumbai
  [-33.933, 18.474], // Cape Town
];

const getPosition = function (): Promise<GeolocationPosition> {
  return new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

/* getPosition
  .then(pos => console.log(pos))
  .catch(error => console.log('error:', error.message));

getPosition
  .then(coords => getCoordsData(coords))
  .then(data => getCountryData(data.country));
 */
const getCoordsData = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng})}?geoit=json`);
    })

    .then(resp => resp.json())
    .then((data: GeocodeResponse) => {
      // console.log(data);
      if (!isFinite(data.distance))
        throw new Error('API refused. Please reload!');
      console.log(`Those coords point to ${data.city}, ${data.country}`);

      return data.country.toLowerCase();
    })
    .then(country => getCountryData(country))
    .catch(err => console.log(err.message));
};
btn.addEventListener('click', getCoordsData);
/* getCoordsData(testData[1]).then(coordsData => {
  // console.log(coordsData);
  getCountryData(coordsData.country.toLowerCase());
}); */

////////////////////////////
//////// Event loop in practice

/* console.log('Test start'); // 1, top-level code
setTimeout(() => console.log('0 sec Timer'), 0); // 5, call back queue
Promise.resolve('Resolved promise 1').then(val => console.log(val)); // 3, because microtasks queue has higher priority
Promise.resolve('Resolved promise 2').then(val => {
  // 4, long microtask
  for (let i = 0; i < 1_000_000_000; i++) {}
  console.log(val);
});
console.log('Test End'); // 2, top-level code */

/* const lotteryPromise = new Promise(function executor(resolve, reject) {
  console.log('Lotterie draw starts...');

  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win! 🥳');
    } else {
      reject(new Error('Sorry, you lose! 💩'));
    }
  }, 2000);
})
  .then(val => console.log(val))
  .catch((err: Error) => console.error(err.message));

const wait = function (seconds: number) {
  console.log(`Waiting for ${seconds} seconds...`);

  console.time('Stop watch');

  return new Promise<unknown>(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(3)
  .then(() => {
    console.timeEnd('Stop watch');
    return wait(1);
  })
  .then(() => console.log('Waited 1 more second'));

// Resolve/reject immediately
Promise.resolve('myPromiseValue is immediately resolved!').then(val =>
  console.log(val)
);
Promise.reject(new Error('Rejected immediately!')).catch((err: Error) =>
  console.error(err.message)
); */
