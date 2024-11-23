const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');

// Lấy tất cả dịch vụ
router.get('/', serviceController.getAllServices);

module.exports = router;
