//global vars

//scrapper.js

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
  return ul;
}


function updateArticlesList(container, articles, webpage, rows, homePageNumber) {
  container.innerHTML = '';
  container.className = 'links-scrapped';
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
    li.className = "list";

    a.appendChild(p);
    li.appendChild(a);
    container.appendChild(li);
  })
  settingsPagination(container,articles,webpage,rows, homePageNumber);
}

const settingsPagination = (container,totalArticles,webpage, rows, homePageNumber) => {
  const nav = document.createElement("nav");
  const ul = createArticleListContainer();
  nav.className = "pagination"
  ul.className = "pagination__list";
  const totalPages = Math.ceil(totalArticles.length / rows);
  ul.innerHTML = '';
  for(let i = 1; i <= totalPages - 1 ; i++){
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = `${i}`;
    button.className = "pagination__button";
    button.type = "button";
    if(homePageNumber  == i) button.classList.add('pagination__button--active');
    li.className = "pagination__number";
    li.appendChild(button);
    ul.appendChild(li);
    nav.appendChild(ul);
    container.appendChild(nav);
    createButton(button,i,container, totalArticles, webpage, rows)
  }
}

const createButton = (button, i,container, totalArticles, webpage, rows) => {
  const numberButton = i;

  button.addEventListener('click', () => {
    container.innerHTML = '';
    updateArticlesList(container, totalArticles, webpage, rows, numberButton)
  })
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
        homePageNumber
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
