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
    a.target = '_blank';
    a.className = 'text-scrapped';
    p.textContent = article.title;
    li.title = article.title;

    a.appendChild(p);
    li.appendChild(a);
    container.appendChild(li);
  });
}

function convertDateFormat(dateString) {
  const newDate = new Date(dateString);

  // API date format is in UTC "Z" signifies UTC
  const day = newDate.getUTCDate();
  const month = newDate.getUTCMonth() + 1;
  const year = newDate.getUTCFullYear();
  const fullDate = `${day < 9 ? '0' : ''}${day}-${
    month < 9 ? '0' : ''
  }${month}-${year}`;

  return fullDate;
}

function createScrappedResults(data) {
  const scrappedResults = document.createElement('section');
  const objFound = `Matches: ${data['objects found']}`;
  const keyword = `Keyword: ${data['key-word'].keyword}`;
  const usedKeyword = `Used Times: ${data['key-word'].usedTimes}`;
  const webpage = `${data['scanned webpage'].url}`;
  const scrappedTimes = `Scrapped Times: ${data['scanned webpage'].scrapedTimes}`;
  const update = `Last update: ${convertDateFormat(
    data['scanned webpage'].updatedAt,
  )}`;

  scrappedResults.className = 'scrapped-results';
  scrappedResults.innerHTML = `
    <p class="text-scrapped detail" title="${objFound}" aria-label="${objFound}">${objFound}</p>
    <p class="text-scrapped detail" title="${keyword}" aria-label="${keyword}">${keyword}</p>
    <p class="text-scrapped detail" title="${usedKeyword}" aria-label="${usedKeyword}">${usedKeyword}</p>
    <p class="text-scrapped detail" title="${webpage}" aria-label="${webpage}">${webpage}</p>
    <p class="text-scrapped detail" title="${scrappedTimes}" aria-label="${scrappedTimes}">${scrappedTimes}</p>
    <p class="text-scrapped detail" title="${update}" aria-label=${update}>${update}</p> 
    <p class="text-scrapped detail red" id="exportToExcel" title="Export Results">
Export to Excel</p>
  
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
  const url = document.getElementById('url').value;
  const objectClass = document.getElementById('objectClass').value;
  const button = document.getElementById('loading');
  const infoSubmit = document.querySelector('.info');
  const responseContainer = document.getElementById('scrapped');
  const articlesListContainer = createArticleListContainer();
  const keyWord = document.getElementById('keyWord').value;
  event.preventDefault();

  infoSubmit.classList.remove('show');
  infoSubmit.classList.add('hide');

  button.classList.add('show');

  try {
    const data = await fetchData(url, objectClass, keyWord);

    button.classList.remove('show');
    infoSubmit.classList.add('show');
    infoSubmit.classList.remove('hide');

    if (data.state === 'success') {
      updateArticlesList(
        articlesListContainer,
        data['found articles'],
        data['scanned webpage'].url,
      );

      const scrappedResults = createScrappedResults(data, keyWord);
      responseContainer.innerHTML = '';
      responseContainer.appendChild(scrappedResults);
      responseContainer.appendChild(articlesListContainer);
      const exportToExcel = document.getElementById('exportToExcel');
      exportToExcel.addEventListener('click', () => {
        createExport(data['scanned webpage'], data['found articles']);
      });
    } else {
      responseContainer.innerHTML = `<p class="error--message">Error: ${data.message}</p>`;
    }
  } catch (error) {
    console.error(error);
    responseContainer.innerHTML = `<p class="error--message">
    Looks like you found an Error!, try again with another CSS Class container, but if you see again this message probably that site has scrapping protection!</p>`;
    button.classList.remove('show');
    infoSubmit.classList.add('show');
    infoSubmit.classList.remove('hide');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scraper-form');
  form.addEventListener('submit', handleFormSubmit);
});
