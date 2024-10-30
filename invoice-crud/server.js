const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database'); // Connects to MongoDB
const invoiceRoutes = require('./routes/invoiceRoutes'); // Imports invoice routes

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use the invoice routes under the `/api/invoices` path
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
