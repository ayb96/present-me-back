import mongoose from "mongoose";
import SubCategrories from './subCategoriesModel.js'
const Schema = mongoose.Schema;
const maincategoriesSchema = mongoose.Schema({
  imgUrl: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategrories",
    },
  ],
});

export default mongoose.model("MainbCategrories", maincategoriesSchema);
