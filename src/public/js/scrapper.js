// scrapper.js
async function fetchData(url, objectClass, keyWord) {
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

  return await response.json();
}

function createArticleListContainer() {
  const ul = document.createElement('ul');
  ul.className = 'links-scrapped';
  return ul;
}

function updateArticlesList(container, articles, webpage) {
  container.innerHTML = '';
  articles.forEach((article) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const p = document.createElement('p');

    const dinamicUrl = checkUrl(webpage, article.link);
    a.href = dinamicUrl;
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
    <h2 class="text-scrapped" id="exportToExcel">Export To Excel</h2>
  `;
  return scrappedResults;
}

function checkUrl(webpage, url) {
  if (url.startsWith('https://www.')) {
    return url;
  } else {
    return webpage + url;
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const url = document.getElementById('url').value;
  const objectClass = document.getElementById('objectClass').value;
  const keyWord = document.getElementById('keyWord').value;
  const button = document.getElementById('loading');
  const infoSubmit = document.querySelector('.info');
  const responseContainer = document.getElementById('response');
  const articlesListContainer = createArticleListContainer();

  button.classList.add('show');
  infoSubmit.classList.add('hide');

  try {
    const data = await fetchData(url, objectClass, keyWord);

    button.classList.remove('show');
    infoSubmit.classList.add('show');

    if (data.state === 'success') {
      updateArticlesList(
        articlesListContainer,
        data['found articles'],
        data['scanned webpage'].url,
      );

      const scrappedResults = createScrappedResults(data, keyWord);
      responseContainer.innerHTML = '';
      responseContainer.appendChild(scrappedResults);
      responseContainer.appendChild(document.createElement('h3')).textContent =
        'Found Articles:';
      responseContainer.appendChild(articlesListContainer);

      const exportToExcel = document.getElementById('exportToExcel');
      exportToExcel.addEventListener('click', () => {
        createExport(data['scanned webpage'], data['found articles']);
      });
    } else {
      responseContainer.textContent = `Error: ${data.message}`;
    }
  } catch (error) {
    console.error(error);
    responseContainer.textContent = `Error: ${error.message}`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scraper-form');
  form.addEventListener('submit', handleFormSubmit);
});

AOS.init();
