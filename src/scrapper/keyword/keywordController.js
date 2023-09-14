import KeywordService from './keywordService';

class KeywordController {
  constructor(keywordService) {
    this.keywordService = keywordService;
  }
  async createKeyword(req, res, next) {
    return await this.keywordService
      .createKeyword(req.body.keyword)
      .then((keyword) => res.json(keyword))
      .catch((err) => next(err));
  }
}
export default new KeywordController(KeywordService);
