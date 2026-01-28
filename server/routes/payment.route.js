const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.post('/momo', paymentController.createMoMoPayment);
router.post('/momo-ipn', paymentController.handleMoMoIPN);

module.exports = router;
