const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const dealController = require("../controllers/deal.controller");

router.post("/", auth, dealController.createDeal);
router.get("/", auth, dealController.getDeals);
router.get("/:id", auth, dealController.getDealById);
router.put("/:id", auth, dealController.updateDeal);
router.delete("/:id", auth, dealController.deleteDeal);

module.exports = router;