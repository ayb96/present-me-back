import mainCategoriesModel from "../models/mainCategoriesModel.js";
import subCategoriesModel from "../models/subCategoriesModel.js";

export const getSub = async (req, res) => {
  try {
    const pic = await subCategoriesModel.find();
    res.send(pic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSub = (req, res) => {
  subCategoriesModel
    .create(req.body)
    .then(function (sub) {
      return mainCategoriesModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reviews: sub._id } },
        { new: true }
      );
    })
    .then(function (dbProduct) {
      res.json(dbProduct);
    })
    .catch(function (err) {
      res.json(err);
    });
};

export const updateSub = async (req, res) => {
  if (req.body.imgUrl != null) {
    res.searchElementById.imgUrl = req.body.imgUrl;
  }
  if (req.body.title != null) {
    res.searchElementById.title = req.body.title;
  }
  try {
    const updatedUrlImage = await res.searchElementById.save();
    res.json(updatedUrlImage);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteSub = (req, res) => {
  subCategoriesModel.findByIdAndDelete(req.params.id).exec((err, doc) => {
    if (err) {
      response.status(400).send(err);
    } else {
      res.status(200).json(doc);
    }
  });
};

export const getElementid = async (req, res, next) => {
  let searchElementById;
  try {
    searchElementById = await subCategoriesModel.findById(req.params.id);
    if (searchElementById == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.searchElementById = searchElementById;
  next();
};
