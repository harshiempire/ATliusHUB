const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceItemSchema = new Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function () {
        return this.amount === this.quantity * this.price;
      },
      message: "Amount must equal Quantity * Price"
    }
  }
});

module.exports = mongoose.model('InvoiceItem', invoiceItemSchema);
