"use strict";
//////////////////////////////////////////
///NEW API: https://countries-api-836d.onrender.com/countries/
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg) {
    countriesContainer?.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = '1';
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
const renderData = function (dataObject, className = '') {
    const flag = dataObject.flags.png;
    const name = dataObject.name.common;
    const region = dataObject.region;
    const population = (+dataObject.population / 1000000).toFixed(2);
    const languages = Object.values(dataObject.languages).join(', ');
    const currency = Object.values(dataObject.currencies)[0];
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
    // console.log(dataObject);
    countriesContainer.style.opacity = '1';
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
const getJSON = function (URL, errMsg = 'Something went wrong') {
    return fetch(URL).then(response => {
        if (!response.ok) {
            errMsg = response.status === 404 ? "Couldn't find country" : errMsg;
            throw new Error(`${errMsg} (${response.status})! Please try again!`);
        }
        return response.json();
    }, err => console.log(err));
};
const getCountryData = function (country) {
    getJSON(`https://restcountries.com/v3.1/name/${country}`)
        .then(data => {
        renderData(data[0]);
        const neighbours = data[0].borders;
        if (!neighbours)
            console.log(`${data[0].name.common} has no neighbours!`);
        return neighbours;
    })
        .then(neighbours => {
        if (!neighbours)
            return;
        neighbours.forEach((neighbour) => {
            getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`).then(data => renderData(data[0], 'neighbour'));
        });
    })
        .catch((err) => {
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
    [52.508, 13.381],
    [19.037, 72.873],
    [-33.933, 18.474], // Cape Town
];
const getPosition = function () {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
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
        .then((data) => {
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
// const lotteryPromise = new Promise(function executor(resolve, reject) {
//   console.log('Lotterie draw starts...');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You win! 🥳');
//     } else {
//       reject(new Error('Sorry, you lose! 💩'));
//     }
//   }, 2000);
// })
//   .then(val => console.log(val))
//   .catch((err: Error) => console.error(err.message));
const wait = function (seconds) {
    console.log(`Waiting for ${seconds} seconds...`);
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
};
// wait(3)
//   .then(() => {
//     console.timeEnd('Stop watch');
//     return wait(1);
//   })
//   .then(() => console.log('Waited 1 more second'));
// // Resolve/reject immediately
// Promise.resolve('myPromiseValue is immediately resolved!').then(val =>
//   console.log(val)
// );
// Promise.reject(new Error('Rejected immediately!')).catch((err: Error) =>
//   console.error(err.message)
// );
///////////////////////////////////////
/// Challenge 2
/* const testimages = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg'];
const imgContainer = document.querySelector('.images') as HTMLDivElement;

let currentImage: HTMLImageElement;
// 1.
const createImage = (imgPath: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const imgEl = document.createElement('img');

    imgEl.src = imgPath;
    imgEl.onerror = ev => reject(console.log(ev));
    imgEl.onload = () => {
      imgContainer.append(imgEl);
      currentImage = imgEl;
      resolve(imgEl);
    };
  });
};

createImage(testimages[0])
  .then(() => wait(2))
  .then(() => (currentImage.style.display = 'none'))
  .then(() => createImage(testimages[1]))
  .then(() => wait(2))
  .then(() => (currentImage.style.display = 'none'))
  .catch(err => console.log(err)); */
/* testimages.forEach(imgPath => {
  createImage(imgPath)
    .then(imgEl => {
      console.log(imgEl);
      document
        .querySelector('.images')
        ?.insertAdjacentElement('beforeend', imgEl);
    })
    .catch(err => console.error(err));
});
 */
// Test
///////////////////////////////////
///// Async/Await
/* const whereAmI = async function () {
  try {
    // GeoPos API
    const myPosition = await getPosition();
    const { latitude: lat, longitude: lng } = myPosition.coords;

    // Reverse GeoCode API
    const coordsDataStream = await fetch(
      `https://geocode.xyz/${lat},${lng})}?geoit=json`
    );
    const coordsData = await coordsDataStream.json();

    // Throw Error if API doesn't work
    if (!isFinite(coordsData.distance)) throw new Error('API exceeded!');

    // RESTCountries API
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${coordsData.country.toLowerCase()}`
    );
    const data = await response.json();
    renderData(data[0]);
    return `You are in ${coordsData.city}, the most beautiful city in ${coordsData.country}!`;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      renderError(`Something went wrong ${err.message}`);
    } else console.log(err);

    // Reject promise with re-throw error
    throw err;
  }
}; */
/* console.log('1: Getting location');
whereAmI()
  .then(sentence => console.log(`2: ${sentence}`))
  .catch(err => console.log(`2: ${err.message}`))
  .finally(() =>
    console.log('3: Finished try getting location not matter if succesfully')
  ); */
// use IIFE to not mix then() into
/* (async function () {
  try {
    const resp = await whereAmI();
    console.log(`Määäähh ${resp}`);
  } catch (err) {
    throw err;
  }
  console.log('Only displayed if there was no error...');
})(); */
/////////////////////////////////////////
////// Try & Catch
/* try {
  let y = 1;
  const x = 2;
  x = 3;
} catch (err) {
  console.log(err);
} */
// function input 3 countries, logs capital cities to console
/* const log3Cities = async function (array: string[]) {
  try {
    const cities: string[] = [];

    const all3 = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${array[0]}`),
      getJSON(`https://restcountries.com/v3.1/name/${array[1]}`),
      getJSON(`https://restcountries.com/v3.1/name/${array[2]}`),
    ]);

    const [[c1], [c2], [c3]] = all3;
    console.log(c1, c2, c3);

    cities.push(...c1.capital, ...c2.capital, ...c3.capital);

    console.log(all3.map(data => data[0].capital[0]));

    console.log(cities);
  } catch (error) {
    throw error;
  }
};

const threeCountries = ['finland', 'sweden', 'uruguay'];
log3Cities(threeCountries); */
//Promis.race()
/* (async function () {
  const [race] = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/germany`),
    getJSON(`https://restcountries.com/v3.1/name/poland`),
    getJSON(`https://restcountries.com/v3.1/name/turkey`),
  ]);
  console.log(race);
})();

// creating timeout if a fetch takes too long
const timeout = function (s: number): Promise<PromiseRejectedResult> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Takes too long!')), s * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/mexico`),
  timeout(1),
])
  .then(val => console.log(...val[0].capital))
  .catch(err => console.error(err.message)); */
// allSettled() returns all promises
// despite all() which return Error if one is wrong
/* Promise.allSettled([
  Promise.resolve('A resolved Promise'),
  Promise.reject('A rejected Promise'),
  Promise.resolve('Another resolved Promise Pommes'),
])
  .then(promises => console.table(promises))
  .catch(err => console.log(err));

Promise.all([
  Promise.resolve('A resolved Promise'),
  Promise.reject('A rejected Promise'),
  Promise.resolve('Another resolved Promise Pommes'),
])
  .then(promises => console.table(promises))
  .catch(err => console.error(err));

// Promise.any() returns first fulfilled Promise
// will simply ignore rejected contrary to .race()
Promise.any([
  Promise.resolve('A resolved Promise'),
  Promise.reject('A rejected Promise'),
  Promise.resolve('Another resolved Promise Pommes'),
])
  .then(promises => console.table(promises))
  .catch(err => console.error(err)); */
/////////////////////////////////
//// Challenge 3
const testimages = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg'];
const imgContainer = document.querySelector('.images');
const createImage = async function (URL) {
    const imgEl = document.createElement('img');
    await new Promise((resolve, reject) => {
        imgEl.src = URL;
        imgEl.onload = () => resolve(imgEl.src);
        imgEl.onerror = () => reject(new Error('Path not found!'));
    });
    imgContainer.append(imgEl);
    return imgEl;
};
/* const loadNPause = async (imgPaths: string[], sec: number) => {
  try {
    let curImg;
    for (let i = 0; i < imgPaths.length; i++) {
      curImg = await createImage(imgPaths[i]);
      console.log(`Image ${i + 1} loaded.`);
      await new Promise(resolve => setTimeout(resolve, sec * 1000));
      curImg.style.display = 'none';
    }
  } catch (err) {
    console.error(err);
  }
};
loadNPause(testimages, 2); */
const loadAll = async function (imgPaths) {
    try {
        const imgs = imgPaths.map(path => createImage(path));
        const fullf = await Promise.all(imgs);
        fullf.forEach(img => img.classList.add('parallel'));
    }
    catch (error) {
        console.error(error);
    }
};
loadAll(testimages);
