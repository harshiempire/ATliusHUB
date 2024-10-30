const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const InvoiceBillSundry = require('../models/InvoiceBillSundry');

// CREATE Invoice
router.post('/', async (req, res) => {
    try {
      const { items, billsundries, ...invoiceData } = req.body;
  
      // Get the next invoice number
      const invoiceNumber = await getNextInvoiceNumber();
  
      // Validate and calculate total amount
      let itemsTotal = 0;
      const invoiceItems = await Promise.all(items.map(async item => {
        const newItem = new InvoiceItem(item);
        await newItem.validate();
        itemsTotal += newItem.amount;
        return newItem.save();
      }));
  
      let sundriesTotal = 0;
      const invoiceBillSundries = await Promise.all(billsundries.map(async sundry => {
        const newSundry = new InvoiceBillSundry(sundry);
        sundriesTotal += newSundry.amount;
        return newSundry.save();
      }));
  
      const totalAmount = itemsTotal + sundriesTotal;
      const newInvoice = new Invoice({
        ...invoiceData,
        invoiceNumber,
        totalAmount,
        items: invoiceItems.map(item => item._id),
        billsundries: invoiceBillSundries.map(sundry => sundry._id)
      });
      await newInvoice.save();
  
      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
// GET all Invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('items billsundries');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET one Invoice
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('items billsundries');
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Invoice
router.put('/:id', async (req, res) => {
  try {
    const { items, billsundries, ...invoiceData } = req.body;

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    invoice.set(invoiceData);
    await invoice.save();

    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE Invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
