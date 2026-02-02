import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setAccountData }) => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []); // Prompt Login
                
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                const balanceWei = await provider.getBalance(address);
                const balanceEth = ethers.formatEther(balanceWei);

                setAccount(address);
                setBalance(balanceEth);

                // Kirim data ke App.js
                setAccountData({ address, balance: balanceEth, provider, signer });
                setErrorMessage('');
                
            } catch (error) {
                console.error(error);
                setErrorMessage("Koneksi dibatalkan.");
            }
        } else {
            alert("Silakan instal MetaMask!");
        }
    };

    const disconnectWallet = () => {
        // Reset Local State
        setAccount('');
        setBalance('');
        
        // Reset Parent State (App.js)
        setAccountData({ address: '', balance: '', provider: null, signer: null });
    };

    return (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            {/* tampilan jika terkoneksi */}
            {account ? (
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #4CAF50', 
                    borderRadius: '12px', 
                    background: '#e8f5e9',
                    display: 'inline-block'
                }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        ✅ Terhubung: {account.substring(0, 6)}...{account.substring(38)}
                    </p>
                    <p style={{ margin: '0 0 15px 0' }}>Saldo: <strong>{balance} ETH</strong></p>
                    
                    <button 
                        onClick={disconnectWallet}
                        style={{ 
                            padding: '10px 25px', 
                            cursor: 'pointer', 
                            backgroundColor: '#f44336',
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                /* Tampilan jika belum terkoneksi */
                <button 
                    onClick={connectWallet} 
                    style={{ 
                        padding: '15px 40px', 
                        cursor: 'pointer', 
                        backgroundColor: '#FF9800',
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '12px',
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.1s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    🦊 Connect MetaMask
                </button>
            )}
            
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
    );
};

export default WalletConnect;