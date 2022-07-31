import searchRouteBox from "./searchRouteBox";

it("loads the routeboxer script", () => {
  let scriptSource = "/routeBoxer.min.js";
  searchRouteBox();
  let scriptTag = document.querySelector("script");
  expect(scriptTag.getAttribute("src"), scriptSource);
});

it("returns a list of places", () => {
  expect.assertions(1);
  global.RouteBoxer = jest.fn(() => {
    return {
      box: jest.fn(),
    };
  });
  let path = {
    routes: [
      {
        overview_path: null,
      },
    ],
  };
  expect(searchRouteBox(path, "movie_theater")).resolves.toEqual({
    boxes: [],
    places: [],
  });
});
