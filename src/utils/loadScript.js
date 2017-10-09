// Script influenced from https://liamnewmarch.co.uk/posts/promises/

const loadScript = (url) => {
  var scriptPromise = new Promise((resolve, reject) => {
    // Try to see if the script is already on the DOM
    let script = document.querySelector(`script[src="${url}"]`);
    if (script) {
      return resolve(url);
    }

    // Create a new script tag
    script = document.createElement('script');
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
