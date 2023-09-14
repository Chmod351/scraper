import Result from '../result/resultModel.js';
import { SomethingWentWrong } from '../../helpers/errorHandler.js';
import scrappService from '../scrapping/scrapperService.js';

async function searchKeyword(keyword) {
  const result = await scrappService.getOrCreateKeyword(keyword);
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
    throw new SomethingWentWrong(error.message);
  }
}

const relatedDataService = {
  sendQuery,
};
export default relatedDataService;
