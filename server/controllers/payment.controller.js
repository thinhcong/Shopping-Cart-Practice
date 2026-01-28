const momoService = require('../services/momo.service');

exports.createMoMoPayment = async (req, res) => {
  try {
    const payUrl = await momoService.createMoMoPayment();
    res.json({ payUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'MoMo payment failed' });
  }
};

exports.handleMoMoIPN = (req, res) => {
  console.log('📩 IPN received:', req.body);
  // Sandbox test thì log là đủ
  res.status(200).json({ message: 'OK' });
};
