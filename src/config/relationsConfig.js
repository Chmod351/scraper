import Keyword from '../scrapper/scrapperModel/scrapperKeyword.js';
import Result from '../scrapper/scrapperModel/scrapperResults.js';
import ResultKeyword from '../scrapper/scrapperModel/scrapperResultsKeyword.js';
import WebsiteTarget from '../scrapper/scrapperModel/scrapperTargetModel.js';

// Now set up the associations
Keyword.belongsToMany(ResultKeyword, {
  through: 'ResultKeywordKeyword',
  foreignKey: 'keywordId',
  otherKey: 'resultKeywordId',
});

Result.belongsTo(WebsiteTarget, {
  foreignKey: 'websiteTargetId',
});

Result.belongsToMany(ResultKeyword, {
  through: 'ResultResultKeyword',
  foreignKey: 'resultId',
  otherKey: 'resultKeywordId',
});

ResultKeyword.belongsToMany(Keyword, {
  through: 'ResultKeywordKeyword',
  foreignKey: 'resultKeywordId',
  otherKey: 'keywordId',
});

ResultKeyword.belongsToMany(Result, {
  through: 'ResultResultKeyword',
  foreignKey: 'resultKeywordId',
  otherKey: 'resultId',
});

WebsiteTarget.hasMany(Result, {
  foreignKey: 'websiteTargetId',
});
