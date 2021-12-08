const express = require("express");
const {
  create,
  listByParentId,
  update,
  remove,
  serviceId,
  detail,
} = require("../controllers/service");
const router = express.Router();

router.post("/service", create);
router.get("/services", listByParentId);
router.get("/service/:id", detail);
router.put("/service/:id", update);
router.delete("/service/:id", remove);

router.param("id", serviceId);
module.exports = router;
