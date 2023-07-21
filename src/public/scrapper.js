window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scraper-form');
  const responseContainer = document.getElementById('response');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const objectClass = document.getElementById('objectClass').value;
    const keyWord = document.getElementById('keyWord').value;

    fetch('/api/scrappe', {
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
                `<li>
          <a href=${scannedWebpage}${article.link} role="link">
          <p>${article.title}</p>
          </a>
            </li>`,
            )
            .join('');
          responseContainer.innerHTML = `
          <section class="scrapped-results">
          <p class="text">Matchs: ${objectsFound}</p>
          <p class="text">Key Word: ${keyWord}</p>
          <p class="text">Target: ${scannedWebpage}</p>
          </section>
          <h3 class="big-title">Found Articles:</h3>
          <div class="links-scrapped">
          <ul>${articlesList}</ul>
          </div>
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

AOS.init();
