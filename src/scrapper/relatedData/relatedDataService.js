import Result from '../scrapping/scrapperModel/scrapperResults.js';

async function sendQuery(keyword) {
  const results = await Result.find({ keywords: keyword }).exec();
  return results;
}

const relatedDataService = {
  sendQuery,
};
export default relatedDataService;
