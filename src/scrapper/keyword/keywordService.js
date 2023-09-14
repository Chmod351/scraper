import KeywordRespository from '../repository/keywordRepository';

class KeywordService {
  constructor(keywordRepository) {
    this.keywordRepository = keywordRepository;
  }

  async createKeyword(keyword) {
    const { doc, created } = await this.keywordRepository.create(keyword);
    return doc;
  }
}

export default new KeywordService(KeywordRespository);
