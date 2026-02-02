import React from 'react';

const TransactionList = ({ transactions }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Riwayat Transaksi</h3>
            {transactions.length === 0 ? (
                <p>Belum ada data transaksi.</p>
            ) : (
                <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {transactions.map((tx) => (
                        <div key={tx.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                            <p><strong>From:</strong> {tx.from}</p>
                            <p><strong>To:</strong> {tx.to}</p>
                            <p><strong>Amount:</strong> {tx.amount}</p>
                            <small style={{ color: '#666' }}>{tx.timestamp}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;