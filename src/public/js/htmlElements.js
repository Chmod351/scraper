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
