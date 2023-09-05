<<<<<<< HEAD
//global vars


//scrapper.js
=======
// scrapper.js
>>>>>>> 6cc237455252a505adb7bf42c86a859d307e2e63

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

async function handleFormSubmit(event) {
  /* inpust value url, cssClass, KeyWord */
  const url = document.getElementById('url').value;
  const objectClass = document.getElementById('objectClass').value;
  const keyWord = document.getElementById('keyWord').value;
  /*button form */
  const button = document.getElementById('loading');
  const infoSubmit = document.querySelector('.info');
  /*container of result */
  const responseContainer = document.getElementById('scrapped');
  const articlesListContainer = createArticleListContainer();
  /*pagination settings */
  const rows = 9;
  const homePageNumber = 1;
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
        rows,
        homePageNumber,
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
      responseContainer.textContent = `Error: ${data.message}`;
    }
  } catch (error) {
    console.error(error);
    responseContainer.textContent = `Error: ${error.message}`;
  }
}

/* create ul */
function createArticleListContainer() {
  const ul = document.createElement('ul');
  return ul;
}

<<<<<<< HEAD
=======
/*create card */
function updateArticlesList(
  container,
  articles,
  webpage,
  rows,
  homePageNumber,
) {
  container.innerHTML = '';
  // container.className = 'links-scrapped';
  homePageNumber--;
  const startIndex = rows * homePageNumber;
  const endIndex = startIndex + rows;
  const leakedArticles = articles.slice(startIndex, endIndex);

  leakedArticles.forEach((article) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const p = document.createElement('p');

    const dinamicUrl = checkUrl(webpage, article.link);
    a.href = dinamicUrl;
    a.target = '_blank';
    a.className = 'text-scrapped';
    p.textContent = article.title;
    li.title = article.title;
    li.className = 'list';

    a.appendChild(p);
    li.appendChild(a);
    container.appendChild(li);
  });
  settingsPagination(container, articles, webpage, rows, homePageNumber);
}
// function updateArticlesList(container, articles, webpage) {
//   container.innerHTML = '';
//   articles.forEach((article) => {
//     const li = document.createElement('li');
//     const a = document.createElement('a');
//     const p = document.createElement('p');

//     const dinamicUrl = checkUrl(webpage, article.link);
//     a.href = dinamicUrl;
//     a.target = '_blank';
//     a.className = 'text-scrapped';
//     p.textContent = article.title;
//     li.title = article.title;

//     a.appendChild(p);
//     li.appendChild(a);
//     container.appendChild(li);
//   });
// }

/*section data result left */

>>>>>>> 6cc237455252a505adb7bf42c86a859d307e2e63
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

<<<<<<< HEAD
=======
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

function settingsPagination(
  container,
  totalArticles,
  webpage,
  rows,
  homePageNumber,
) {
  const nav = document.createElement('nav');
  const ul = createArticleListContainer();
  nav.className = 'pagination';
  ul.className = 'pagination__list';
  const totalPages = Math.ceil(totalArticles.length / rows);
  ul.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = `${i}`;
    button.className = 'pagination__button';
    button.type = 'button';
    if (homePageNumber + 1 == i)
      button.classList.add('pagination__button--active');
    li.className = 'pagination__number';
    li.appendChild(button);
    ul.appendChild(li);
    nav.appendChild(ul);
    container.appendChild(nav);
    createButton(button, i, container, totalArticles, webpage, rows);
  }
}

const createButton = (button, i, container, totalArticles, webpage, rows) => {
  const numberButton = i;

  button.addEventListener('click', () => {
    container.innerHTML = '';
    updateArticlesList(container, totalArticles, webpage, rows, numberButton);
  });
};

>>>>>>> 6cc237455252a505adb7bf42c86a859d307e2e63
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
