require('dotenv').config();
const express = require('express');
const cors = require('cors');

const paymentRoute = require('./routes/payment.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/payment', paymentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
console.log(paymentRoute);
