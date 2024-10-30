const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  date: { type: Date, default: Date.now },
  invoiceNumber: { type: Number, unique: true, required: true },
  customerName: { type: String, required: true },
  billingAddress: { type: String, required: true },
  shippingAddress: { type: String },
  gstin: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'InvoiceItem' }],
  billsundries: [{ type: Schema.Types.ObjectId, ref: 'InvoiceBillSundry' }]
});

module.exports = mongoose.model('Invoice', invoiceSchema);
