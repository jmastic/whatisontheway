import loadScript from "./loadScript";

test("adds a script tag to the DOM", () => {
  let scriptSource = "test.js";
  loadScript(scriptSource);
  let scriptTag = document.querySelector("script");
  expect(scriptTag.getAttribute("src")).toEqual(scriptSource);
});
