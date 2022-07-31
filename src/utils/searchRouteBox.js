import loadScript from "./loadScript";
import * as Constants from "../constants";
import getRandomSample from "./getRandomSample";
import { getNumberAtRangePercent, getPercentageInRange } from "./rangePercentage";

// This is some magic to determine how big to make the bounds
// The further the distance of the path, the larger the boxes we want to have
const maxKilometersBoxBoundary = Constants.MAX_MILES_FROM_PATH_TO_BOUNDS * 0.621371;
const minKilometersBoxBoundary = Constants.MIN_MILES_FROM_PATH_TO_BOUNDS * 0.621371;
const maxKilometersPathDistance = Constants.MAX_MILES_PATH_RANGE * 0.621371;
const minKilometersPathDistance = Constants.MIN_MILES_PATH_RANGE * 0.621371;

const searchBoxes = (path, type, map, pathDistanceInMeters) => {
  let boxes = [];
  let places = [];

  return new Promise((resolve, reject) => {
    const routeBoxer = new window.RouteBoxer();

    // Get the length of the path
    const pathLengthKilometers = pathDistanceInMeters / 1000;
    // Scale will be minimum to maximum kms bounds
    const percentage = getPercentageInRange(pathLengthKilometers, maxKilometersPathDistance, minKilometersPathDistance);
    const kilometersFromPathToBounds = getNumberAtRangePercent(
      percentage,
      maxKilometersBoxBoundary,
      minKilometersBoxBoundary
    );

    boxes = routeBoxer.box(path, kilometersFromPathToBounds) || [];
    let boxesToSearch = [...boxes];
    const google = window.google;

    let boxPromises = [];

    const maxPlaces = Constants.MAX_PLACES_PER_PATH;
    const maxBoxes = Constants.MAX_BOX_BOUNDS_PER_PATH;

    // If we have more boxes in the path than the maximum boxes to search (for performance and limits reasons)
    // Then select a random sample of boxes in the path.
    if (boxes.length > maxBoxes) {
      boxesToSearch = getRandomSample(boxes, maxBoxes);
    }

    const maxPlacesPerBox = Math.ceil(maxPlaces / boxesToSearch.length);

    boxesToSearch.forEach((bounds) => {
      boxPromises.push(
        new Promise((resolveBox, rejectBox) => {
          const placeRequest = {
            bounds: bounds,
            type: [type],
            rankBy: google.maps.places.RankBy.PROMINENCE,
          };
          const service = new google.maps.places.PlacesService(map);
          service.nearbySearch(placeRequest, (results, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              // Probably means we didn't get results in this box
              return resolveBox();
            }

            // Only return the maximum number of results for this box
            places = places.concat(results.slice(0, maxPlacesPerBox));
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
      const distanceInMeters = path.routes[0].legs.reduce((acc, curr) => {
        return (acc += curr.distance.value);
      }, 0);
      searchBoxes(overviewPath, type, map, distanceInMeters)
        .then((places, boxes) => resolve(places, boxes))
        .catch((error) => reject(error));
    });
  });
};

export default searchRouteBox;
