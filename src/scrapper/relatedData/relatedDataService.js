import Result from '../scrapping/scrapperModel/scrapperResults.js';
import Keyword from '../scrapping/scrapperModel/scrapperKeyword.js';

Result.collection
  .getIndexes({ full: true })
  .then((indexes) => {
    console.log('Indexes:', indexes);
  })
  .catch(console.error);

async function searchKeyword(keyword) {
    const result = await Keyword.findOne({ keyword });
    return result;
}

async function getDataByKeyword(keywordId) {
  const results = await Result.find({ keywords: keywordId }).exec();
  return results;
}

async function sendQuery(keyword) {
  try {
    const foundKeyword = await searchKeyword(keyword);
    const results = await getDataByKeyword(foundKeyword._id);
    return results;
  } catch (error) {
    throw error;
  }
}

const relatedDataService = {
  sendQuery,
};
export default relatedDataService;
