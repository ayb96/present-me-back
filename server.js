import express, { response } from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import Slider from "./models/SliderShema.js";
import Cors from "cors";
import apiRouter from "./routes/subcategories.js";
import mainCoRouter from "./routes/mainCategories.js";
import singleCoRouter from "./routes/singleCategories.js";

import userRoutes from "./routes/adminRoute.js";
import { deleteSub } from "./Controllers/mainCategoriesController.js";

import maincategoriesSchema from "./models/mainCategoriesModel.js";
import subcategoriesSchema from "./models/subCategoriesModel.js";
import singlecategoriesSchema from "./models/singleCategoriesModel.js";
dotenv.config();
const app = express();

const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rwbgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(express.json());
app.use(Cors());
app.use("/subcategories", apiRouter);
app.use("/maincategories", mainCoRouter);
app.use("/singlecategories", singleCoRouter);
app.use("/admin", userRoutes);

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection
  .once("open", () => console.log("Database is connected successfully!"))
  .on("error", (error) => {
    console.log("We Have An Error: " + error);
  });

app.get("/", (req, res) => {
  res.status(200).send("hello word");
});

app.post("/home", (req, res) => {
  const dbCard = req.body;

  Slider.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err); //internal server error
    } else {
      res.status(201).send(data); // successfully created
    }
  });
});

app.post("/login", (req, res) => {
  console.log("Hellooooooooooooooooo!");
});
app.get("/home", (req, res) => {
  Slider.find((err, data) => {
    if (err) {
      res.status(500).send(err); //internal server error
    } else {
      res.status(200).send(data); // retriving every single this from the data abse related to this data
    }
  });
});

app.get("/event", (req, res) => {
  res.status(200).send("hello word");
});

//test reference schema
//insert data in mainCategory
app.post("/maincat", function (req, res) {
  maincategoriesSchema
    .create(req.body)
    .then(function (mains) {
      res.json(mains);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// insert data in the reviews array nested inside maincategory object
//using positional operators
app.post("/subcat/:id", function (req, res) {
  subcategoriesSchema
    .create(req.body)
    .then(function (sub) {
      return maincategoriesSchema.findOneAndUpdate(
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
});

app.post("/singlecat/:id", function (req, res) {
  singlecategoriesSchema
    .create(req.body)
    .then(function (sub) {
      return subcategoriesSchema.findOneAndUpdate(
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
});

app.get("/main/:id", function (req, res) {
  maincategoriesSchema
    .findOne({ _id: req.params.id })

    .populate({
      path: "reviews",
      populate: {
        path: "events",
      },
    })

    .then(function (dbProduct) {
      res.json(dbProduct);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.delete("/deletemain/:id", (req, res) => {
  maincategoriesSchema.findByIdAndDelete(req.params.id).exec((err, doc) => {
    if (err) {
      response.status(400).send(err);
    } else {
      res.status(200).json(doc);
    }
  });
});
app.delete("/deletesub/:id", (req, res) => {
  subcategoriesSchema.findByIdAndDelete(req.params.id).exec((err, doc) => {
    if (err) {
      response.status(400).send(err);
    } else {
      res.status(200).json(doc);
    }
  });
});
app.delete("/deletesingle/:id", (req, res) => {
  singlecategoriesSchema.findByIdAndDelete(req.params.id).exec((err, doc) => {
    if (err) {
      response.status(400).send(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/mainw", async function (req, res) {
  try {
    const pic = await maincategoriesSchema
      .find()

      .populate({
        path: "reviews",
        populate: {
          path: "events",
        },
      });
    res.send(pic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//end of reference schema

app.listen(process.env.PORT || 8011, () => {
  console.log(`listening on port 8008`);
});
