import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate'
const ResultSchema = new mongoose.Schema(
  {
    websiteTarget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WebsiteTarget',
    },
    keywords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' }],
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { autoIndex: false },
);
ResultSchema.plugin(findOrCreate)
ResultSchema.index({ keywords: 'text' });
const Result = mongoose.model('Result', ResultSchema);
export default Result;
