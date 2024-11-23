const express = require("express");
const { getServiceOptionsByServiceId } = require("../controllers/serviceOption.controller");

const router = express.Router();

/**
 * Route: Lấy danh sách các tùy chọn theo `serviceId`
 * Method: GET
 * Endpoint: /api/service-options/:id
 */
router.get("/:id", getServiceOptionsByServiceId);

module.exports = router;
