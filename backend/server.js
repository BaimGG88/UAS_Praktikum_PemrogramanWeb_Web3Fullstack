const express = require('express');
const cors = require('cors');
const app = express();

// Import Route
const transactionRoutes = require('./routes/transactions');

app.use(cors());
app.use(express.json());

// ROUTE
// Apabila ada yang akses /api/transactions, lempar ke file transactions.js
app.use('/api/transactions', transactionRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});