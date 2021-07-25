import express from "express";

import {
  createSub,
  updateSub,
  deleteSub,
  getbyidSub,
  getElementid,
} from "../Controllers/mainCategoriesController.js";
const router = express.Router();

router.get("/:id", getElementid, getbyidSub);

router.post("/", createSub);

router.patch("/:id", getElementid, updateSub);

router.delete("/:id", getElementid, deleteSub);

export default router;
