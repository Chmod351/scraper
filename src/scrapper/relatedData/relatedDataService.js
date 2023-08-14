import Result from '../scrapping/scrapperModel/scrapperResults.js';
import mongoose from 'mongoose';

Result.collection
  .getIndexes({ full: true })
  .then((indexes) => {
    console.log('Indexes:', indexes);
  })
  .catch(console.error);

async function sendQuery(keyword) {
  try {
    const keywordObjectId = new mongoose.Types.ObjectId(keyword);
    const results = await Result.find({ keywords: keywordObjectId }).exec();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const relatedDataService = {
  sendQuery,
};
export default relatedDataService;
