import React from 'react';

const BalanceDisplay = ({ balance }) => {
    return (
        <div className="balance-card" style={{ padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
            <h4>Wallet Terkoneksi</h4>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {balance ? `${balance} ETH` : "0.00 ETH"}
            </p>
        </div>
    );
};

export default BalanceDisplay;