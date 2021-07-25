import mongoose from "mongoose";
const Schema = mongoose.Schema;
const subcategoriesSchema = mongoose.Schema({
  imgUrl: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "SingleCategrories",
    },
  ],
  
});

export default mongoose.model("SubCategrories", subcategoriesSchema);
