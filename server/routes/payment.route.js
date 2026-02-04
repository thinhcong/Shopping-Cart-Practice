const express = require('express');
const router = express.Router();
const vnpayController = require('../controllers/vnpay.controller');
router.get('/vnpay-return', vnpayController.vnpayReturn);

router.post('/vnpay', vnpayController.createVNPayPayment);

module.exports = router;   