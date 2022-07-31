import loadScript from "./loadScript";

const searchBoxes = (path, type, map) => {
  let boxes = [];
  let places = [];

  return new Promise((resolve, reject) => {
    const routeBoxer = new window.RouteBoxer();
    // Cover only .5 mile radius for now
    boxes = routeBoxer.box(path, 0.8) || [];
    const google = window.google;

    let boxPromises = [];

    boxes.forEach((bounds) => {
      boxPromises.push(
        new Promise((resolveBox, rejectBox) => {
          const placeRequest = {
            bounds: bounds,
            type: [type],
          };
          const service = new google.maps.places.PlacesService(map);
          service.nearbySearch(placeRequest, (results, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              return resolveBox();
            }

            places = places.concat(results);
            return resolveBox(results);
          });
        })
      );
    });

    Promise.all(boxPromises)
      .then(() => {
        resolve({
          places,
          boxes,
        });
      })
      .catch(() => {
        resolve({
          places,
          boxes,
        });
      });
  });
};

const searchRouteBox = (path, type, map) => {
  return new Promise((resolve, reject) => {
    loadScript("/routeBoxer.min.js").then(() => {
      const overviewPath = path.routes[0].overview_path;
      searchBoxes(overviewPath, type, map)
        .then((places, boxes) => resolve(places, boxes))
        .catch((error) => reject(error));
    });
  });
};

export default searchRouteBox;
