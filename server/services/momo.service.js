const https = require('https');
const crypto = require('crypto');

exports.createMoMoPayment = () => {
  return new Promise((resolve, reject) => {
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const partnerCode = process.env.MOMO_PARTNER_CODE;

    const orderInfo = 'pay with MoMo';
    const redirectUrl = 'http://localhost:3000/payment-success';
    const ipnUrl = 'http://localhost:5000/api/payment/momo-ipn';
    const requestType = 'payWithMethod';
    const amount = '50000';
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = '';
    const autoCapture = true;
    const lang = 'vi';

    const rawSignature =
      `accessKey=${accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${partnerCode}` +
      `&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`;

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData,
      signature
    });

    const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(options, res => {
      res.setEncoding('utf8');
      res.on('data', body => {
        const data = JSON.parse(body);
        if (data.resultCode === 0) {
          resolve(data.payUrl);
        } else {
          reject(data);
        }
      });
    });

    req.on('error', err => reject(err));
    req.write(requestBody);
    req.end();
  });
};
