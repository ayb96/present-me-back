import express from "express";

import {
  createSub,
  updateSub,
  deleteSub,
  getElementid,
} from "../Controllers/subcategoriesController.js";
const router = express.Router();

router.post("/:id", createSub);

router.patch("/:id", getElementid, updateSub);

router.delete("/:id", getElementid, deleteSub);

export default router;
