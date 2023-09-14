import WebsiteTarget from '../targetSite/targetModel.js';

class WebsiteRepository {
  constructor(websiteTarget) {
    this.websiteTarget = websiteTarget;
  }
  async create(url, cssClass) {
    return await this.websiteTarget.findOrCreate(
      { url, cssClass },
      { $inc: { scrapedTimes: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
  async getAll() {
    return await this.websiteTarget.find().exec();
  }
  async getByQuery(query) {
    return await this.websiteTarget
      .find()
      .exec({ url: { $regex: query, $options: 'i' } });
  }
}

export default new WebsiteRepository(WebsiteTarget);
