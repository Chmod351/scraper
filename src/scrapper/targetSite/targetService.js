import WebsiteRepository from '../repository/targetRepository.js';
class TargetsiteService {
  constructor(target) {
    this.target = target;
  }
  async create(url, cssClass) {
    const { doc, create } = await this.target.create(url, cssClass);
    return doc;
  }
  async getAll() {
    const res = await this.target.getAll();
    return res;
  }
  async getByQuery(q) {
    const res = await this.target.getByQuery(q);
    return res;
  }
}
export default new TargetsiteService(WebsiteRepository);
