import TargetsiteService from './targetService.js';

class TargetsiteController {
  constructor(targetService) {
    this.targetService = targetService;
  }
  async createSite(req, res, next) {
    return await this.targetService
      .create(req.body.url, req.body.cssClass)
      .then((response) => res.json(response))
      .catch((err) => next(err));
  }
  async getAll(req, res, next) {
    return await this.targetService
      .getAll()
      .then((response) => res.json(response))
      .catch((err) => next(err));
  }
  async getByQuery(req, res, next) {
    return await this.targetService
      .getByQuery(req.query.query)
      .then((response) => res.json(response))
      .catch((err) => next(err));
  }
}
export default new TargetsiteController(TargetsiteService);
