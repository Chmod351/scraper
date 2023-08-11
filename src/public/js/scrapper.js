window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scraper-form');
  const responseContainer = document.getElementById('response');
  const articlesListContainer = createArticleListContainer();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const objectClass = document.getElementById('objectClass').value;
    const keyWord = document.getElementById('keyWord').value;
    const button = document.getElementById('loading');
    const infoSubmit = document.querySelector('.info');

    button.classList.add('show');
    infoSubmit.classList.add('hide');

    try {
      const response = await fetch('/api/v1/scrappe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          objectClass,
          keyWord,
        }),
      });

      const data = await response.json();

      button.classList.remove('show');
      infoSubmit.classList.add('show');

      if (data.state === 'success') {
        updateArticlesList(articlesListContainer, data['found articles']);

        const scrappedResults = createScrappedResults(data, keyWord);
        responseContainer.innerHTML = '';
        responseContainer.appendChild(scrappedResults);
        responseContainer.appendChild(
          document.createElement('h3'),
        ).textContent = 'Found Articles:';
        responseContainer.appendChild(articlesListContainer);
      } else {
        responseContainer.textContent = `Error: ${data.message}`;
      }
    } catch (error) {
      console.error(error);
      responseContainer.textContent = `Error: ${error.message}`;
    }
  });
});

function createArticleListContainer() {
  const ul = document.createElement('ul');
  ul.className = 'links-scrapped';
  return ul;
}

function updateArticlesList(container, articles) {
  container.innerHTML = '';
  articles.forEach((article) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const p = document.createElement('p');

    a.href = article.link; // Use the correct key to access the link
    a.className = 'text-scrapped';
    p.textContent = article.title;

    a.appendChild(p);
    li.appendChild(a);
    container.appendChild(li);
  });
}

function createScrappedResults(data, keyWord) {
  const scrappedResults = document.createElement('section');
  scrappedResults.className = 'scrapped-results';
  scrappedResults.innerHTML = `
    <p class="text-scrapped">Matches: ${data['objects found']}</p>
    <p class="text-scrapped">Key Word: ${keyWord}</p>
    <p class="text-scrapped">Target: ${data['scanned webpage'].url}</p>
  `;
  return scrappedResults;
}

AOS.init();
