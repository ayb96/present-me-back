import mongoose from "mongoose";

const singlecategoriesSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  date: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  auther: {
    type: String,
    require: true,
  },

  event: {
    type: String,
    require: true,
  },
});

export default mongoose.model("SingleCategrories", singlecategoriesSchema);
