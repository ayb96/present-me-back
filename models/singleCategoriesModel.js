import mongoose from "mongoose";

const singlecategoriesSchema = mongoose.Schema({
  imgUrl: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  
});

export default mongoose.model("SingleCategrories", singlecategoriesSchema);