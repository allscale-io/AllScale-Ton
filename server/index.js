const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Demo data
let products = [
  { id: 1, name: 'Product A', price: 10 },
  { id: 2, name: 'Product B', price: 20 },
];
let invoices = [
  // { id, productId, buyer, amount, status }
];

// Products
app.get('/products', (req, res) => {
  res.json(products);
});

// Invoices
app.get('/invoices', (req, res) => {
  res.json(invoices);
});

app.post('/invoices', (req, res) => {
  const { productId, buyer, amount } = req.body;
  const id = invoices.length + 1;
  const invoice = { id, productId, buyer, amount, status: 'unpaid' };
  invoices.push(invoice);
  res.status(201).json(invoice);
});

app.patch('/invoices/:id/pay', (req, res) => {
  const id = parseInt(req.params.id);
  const invoice = invoices.find(inv => inv.id === id);
  if (invoice) {
    invoice.status = 'paid';
    res.json(invoice);
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 