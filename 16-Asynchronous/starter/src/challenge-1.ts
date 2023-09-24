const getMyCoords = function (
  options?: PositionOptions
): Promise<GeolocationPosition> {
  return new Promise((res, err) =>
    navigator.geolocation.getCurrentPosition(res, err, options)
  );
};

getMyCoords()
  .then(position => {
    if (!position.coords) throw new Error("Couldn't get position");
    return [position.coords.latitude, position.coords.longitude];
  })
  .then(res => {
    return fetch(`https://geocode.xyz/${res.join(',')}?geoit=json`);
  })
  .then(res => res.json())
  .then(json => console.log(json));
