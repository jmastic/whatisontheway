import { loadScript } from './loadScript';

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

function searchRouteBox(origin, destination) {
  getPath(origin, destination)
    .then((path) => {
      loadScript('/routeBoxer.min.js')
        .then((script) => {
          const routeBoxer = new RouteBoxer();
          console.log(routeBoxer);
        })
    })
}

export default searchRouteBox;
