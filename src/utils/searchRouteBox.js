import loadScript from './loadScript';

const getPath = (origin, destination) => {
  return new Promise((resolve, reject) => {
    const google = window.google;
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result.routes[0].overview_path);
      } else {
        reject(status);
      }
    });
  });
}

const searchBoxes = (path, map) => {
  return new Promise((resolve, reject) => {
    const routeBoxer = new window.RouteBoxer();
    // Cover only .5 mile radius for now
    const boxes = routeBoxer.box(path, 1.6);

    // Save the boxes so we can draw them later
    window.boxes = boxes;

    let places = [];
    let boxPromises = [];

    boxes.forEach((bounds) => {
      boxPromises.push(new Promise((resolveBox, rejectBox) => {
        const placeRequest = {
          bounds: bounds,
          type: ['pet_store'],
          // keyword: `pet`,
          // query: `pet store`,
          // rankBy: window.google.maps.places.RankBy.PROMINENCE
        };
        const service = new window.google.maps.places.PlacesService(map);
        // service.textSearch(placeRequest, (results, status) => {
        service.nearbySearch(placeRequest, (results, status) => {
          if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
            return rejectBox(results);
          }

          places = places.concat(results);
          return resolveBox(results);
        })
      }));
    })

    Promise.all(boxPromises)
      .then(() => { resolve(places); })
      .catch(() => { resolve(places) })
  });
}

const searchRouteBox = (origin, destination, mapRef) => {
  return new Promise((resolve, reject) => {
    getPath(origin, destination)
      .then((path) => {
        loadScript('/routeBoxer.min.js')
          .then(() => {
            const map = mapRef.context[Object.keys(mapRef.context)[0]]
            searchBoxes(path, map)
              .then((places) => resolve(places))
              .catch((error) => reject(error));
          })
      })
  });
}

export default searchRouteBox;
