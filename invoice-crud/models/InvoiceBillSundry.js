const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceBillSundrySchema = new Schema({
  billSundryName: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('InvoiceBillSundry', invoiceBillSundrySchema);
