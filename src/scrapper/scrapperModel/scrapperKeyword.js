import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
const KeywordSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: false,
    },
    usedTimes: {
      type: Number,
      defaultValue: 0,
    },
  },
  { timestamps: true },
  { autoIndex: false },
);
KeywordSchema.plugin(findOrCreate);
const Keyword = mongoose.model('Keyword', KeywordSchema);

export default Keyword;
