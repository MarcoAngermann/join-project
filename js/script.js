async function init() {
  await includeHTML();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute('w3-include-html');
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}

/**
 * Initializes the function by fetching the 'script.json' file and logging 'Fertig' if successful.
 *
 * @return {Promise<void>} - A promise that resolves when the initialization is complete.
 */
async function init() {
  await fetch('script.json').catch(errorFunction);
  console.log('Fertig');
}

function errorFunction() {
  console.log('Fehler aufgetreten');
}
