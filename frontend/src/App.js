import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletConnect from './components/WalletConnect';
import TransactionList from './components/TransactionList';
import BalanceDisplay from './components/BalanceDisplay';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contractConfig';

function App() {
    // State untuk Wallet
    const [walletData, setWalletData] = useState({
        address: '',
        balance: '',
        provider: null,
        signer: null
    });

    // State Aplikasi
    const [transactions, setTransactions] = useState([]); 
    const [donors, setDonors] = useState([]); 
    const [totalDonation, setTotalDonation] = useState("0");
    const [loading, setLoading] = useState(false);

    // 1. Fetch Backend
    useEffect(() => {
        fetch('http://localhost:5000/api/transactions')
            .then(res => res.json())
            .then(res => { if(res.success) setTransactions(res.data); })
            .catch(err => console.error("Gagal konek ke backend:", err));
    }, []);

    // 2. Baca Smart Contract
    const fetchContractData = async () => {
        if (walletData.provider) {
            try {
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, walletData.provider);
                
                const total = await contract.totalDonations();
                setTotalDonation(ethers.formatEther(total));

                const donorList = await contract.getDonors();
                const formattedDonors = donorList.map(d => ({
                    address: d.donorAddress,
                    amount: ethers.formatEther(d.amount),
                    timestamp: new Date(Number(d.timestamp) * 1000).toLocaleString()
                }));
                setDonors(formattedDonors);
            } catch (err) {
                console.error("Gagal baca contract:", err);
            }
        }
    };

    useEffect(() => {
        if (walletData.address) fetchContractData();
    }, [walletData.address]);

    // 3. Fungsi Donasi
    const handleDonate = async () => {
        if (!walletData.signer) return alert("Konek ke wallet terlebihdahulu!");
        
        try {
            setLoading(true);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, walletData.signer);
            
            const tx = await contract.donate({ 
                value: ethers.parseEther("0.001"),
                gasLimit: 300000 
            });
            
            await tx.wait();
            alert("Donasi Berhasil! Terima kasih.");
            fetchContractData();
            setLoading(false);
        } catch (err) {
            console.error("Error Donasi:", err);
            alert("Donasi Gagal: " + (err.reason || err.message));
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
            <h1 style={{ textAlign: 'center' }}>Web3 Donation App</h1>
            
            {/* Wallet Section */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <WalletConnect setAccountData={setWalletData} />
                <BalanceDisplay balance={walletData.balance} />
            </div>

            {/* Smart Contract Section */}
            <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '10px', marginTop: '20px', border: '1px solid #90caf9' }}>
                <h2>Smart Contract Integration (Sepolia)</h2>
                <p>Contract Address: <small>{CONTRACT_ADDRESS}</small></p>
                
                <div style={{ background: '#fff', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                        <strong>Total Donasi Terkumpul:</strong>
                        <div style={{ fontSize: '2rem', color: '#1976d2', fontWeight: 'bold' }}>{totalDonation} ETH</div>
                    </div>
                    
                    <button 
                        onClick={handleDonate} 
                        disabled={loading || !walletData.address}
                        style={{ 
                            width: '100%',
                            padding: '18px',
                            background: loading ? '#ccc' : 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '12px', 
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '1.4rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transition: 'transform 0.1s ease'
                        }}
                        onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
                        onMouseOut={(e) => !loading && (e.target.style.transform = 'scale(1)')}
                    >
                        {loading ? "⏳ Sedang Memproses..." : "💸 Donasi Sekarang!"}
                    </button>
                </div>

                <h4 style={{ marginTop: '20px' }}>Daftar Donatur:</h4>
                {donors.length === 0 ? (
                    <p style={{ fontStyle: 'italic', color: '#666' }}>Belum ada donasi.</p>
                ) : (
                    <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {donors.map((d, idx) => (
                            <li key={idx} style={{ marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                                <strong>{d.address.substring(0,6)}...{d.address.substring(38)}</strong> 
                                <span style={{ float: 'right', color: 'green', fontWeight: 'bold' }}>{d.amount} ETH</span>
                                <br/>
                                <small style={{ color: '#888' }}>{d.timestamp}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Backend Data */}
            <hr style={{ margin: '40px 0' }} />
            <TransactionList transactions={transactions} />
        </div>
    );
}

export default App;