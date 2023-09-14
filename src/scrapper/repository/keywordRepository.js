import Keyword from '../keyword/keywordModel.js';

class KeywordRespository {
  constructor(keywordModel) {
    this.keywordModel = keywordModel;
  }
  async create(keyword) {
    return await this.keywordModel.findOrCreate(
      { keyword },
      { $inc: { usedTimes: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
}

export default new KeywordRespository(Keyword);
