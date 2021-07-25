import subCategoriesModel from "../models/subCategoriesModel.js";
import singleCategoriesModel from "../models/singleCategoriesModel.js";

export const getSub = async (req, res) => {
  try {
    const pic = await singleCategoriesModel.find();
    res.send(pic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSub = (req, res) => {
  singleCategoriesModel
    .create(req.body)
    .then(function (sub) {
      return subCategoriesModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { events: sub._id } },
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
  singleCategoriesModel.findByIdAndDelete(req.params.id).exec((err, doc) => {
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
    searchElementById = await singleCategoriesModel.findById(req.params.id);
    if (searchElementById == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.searchElementById = searchElementById;
  next();
};
