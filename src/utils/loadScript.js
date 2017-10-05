// Script influenced from https://liamnewmarch.co.uk/posts/promises/

const loadScript = (url) => {
  var scriptPromise = new Promise((resolve, reject) => {
    // Create a new script tag
    var script = document.createElement('script');
    // Use the url argument as source attribute
    script.src = url;

    // Call resolve when it’s loaded
    script.addEventListener('load', () => { resolve(url) }, false);

    // Reject the promise if there’s an error
    script.addEventListener('error', () => { reject(url) }, false);

    // Add it to the body
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export default loadScript;
