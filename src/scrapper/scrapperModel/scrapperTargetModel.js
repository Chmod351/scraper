import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate'
const WebsiteTargetSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    cssClass: {
      type: String,
      required: true,
    },
    scrapedTimes: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
  { autoIndex: false },
);
WebsiteTargetSchema.plugin(findOrCreate)
const WebsiteTarget = mongoose.model('WebsiteTarget', WebsiteTargetSchema);

export default WebsiteTarget;
