window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scraper-form');
  const responseContainer = document.getElementById('response');

  // Select The Elements
  let toggle_btn;
  let big_wrapper;
  let hamburger_menu;

  function declare() {
    toggle_btn = document.querySelector('.toggle-btn');
    big_wrapper = document.querySelector('.big-wrapper');
    hamburger_menu = document.querySelector('.hamburger-menu');
  }

  const main = document.querySelector('main');

  declare();

  let dark = false;

  function toggleAnimation() {
    // Clone the wrapper
    dark = !dark;
    let clone = big_wrapper.cloneNode(true);
    if (dark) {
      clone.classList.remove('light');
      clone.classList.add('dark');
    } else {
      clone.classList.remove('dark');
      clone.classList.add('light');
    }
    clone.classList.add('copy');
    main.appendChild(clone);

    document.body.classList.add('stop-scrolling');

    clone.addEventListener('animationend', () => {
      document.body.classList.remove('stop-scrolling');
      big_wrapper.remove();
      clone.classList.remove('copy');
      // Reset Variables
      declare();
      events();
    });
  }

  function events() {
    toggle_btn.addEventListener('click', toggleAnimation);
    hamburger_menu.addEventListener('click', () => {
      big_wrapper.classList.toggle('active');
    });
  }

  events();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const objectClass = document.getElementById('objectClass').value;
    const keyWord = document.getElementById('keyWord').value;

    fetch('/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        objectClass,
        keyWord,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const {
          state,
          'objects found': objectsFound,
          'key-word': keyWord,
          'scanned webpage': scannedWebpage,
          'found articles': foundArticles,
        } = data;

        if (state === 'succes') {
          const articlesList = foundArticles
            .map(
              (article) =>
                `<li>Title: ${article.title}, Link: ${article.link}</li>`,
            )
            .join('');
          responseContainer.innerHTML = `
    <p>Objects Found: ${objectsFound}</p>
    <p>Key Word: ${keyWord}</p>
    <p>Scanned Webpage: ${scannedWebpage}</p>
    <p>Found Articles:</p>
    <ul>${articlesList}</ul>
  `;
        } else {
          responseContainer.innerHTML = `<p>Error: ${data.message}</p>`;
        }
      })
      .catch((error) => {
        responseContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
