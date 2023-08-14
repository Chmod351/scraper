import relatedDataService from './relatedDataService.js';

async function getData(req, res, next) {
  const keyword = req.body.keyWord;
  if (keyword) {
    try {
      const result = await relatedDataService.sendQuery(keyword);
      res.json(result);
    } catch (error) {
      next(error);
    }
  } else {
    res.json('withouth keyword we cannot get related results');
  }
}

const relatedDataController = {
  getData,
};

export default relatedDataController;
