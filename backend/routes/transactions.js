const express = require('express');
const router = express.Router();

// Data Dummy dipindah ke sini
const dummyTransactions = [
    { id: 1, from: "0x71C...9A", to: "0x90F...B1", amount: "0.5 ETH", timestamp: "2025-01-12 10:30" },
    { id: 2, from: "0x22A...C4", to: "0xAA1...88", amount: "1.2 ETH", timestamp: "2025-01-11 14:20" },
    { id: 3, from: "0xBB3...11", to: "0xCC2...00", amount: "0.05 ETH", timestamp: "2025-01-10 09:15" }
];

// Endpoint "/"
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: dummyTransactions
    });
});

module.exports = router;