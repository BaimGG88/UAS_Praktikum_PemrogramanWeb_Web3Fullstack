# Web3 Donation DApp — UAS Pemrograman Web

Proyek ini dibuat untuk memenuhi Ujian Akhir Semester (UAS) mata kuliah Pemrograman Web (INF2101). Aplikasi ini adalah Decentralized Application (DApp) sederhana yang menggabungkan antarmuka Web2 modern dengan fungsionalitas Web3 (Ethereum Blockchain).

👤 Identitas Mahasiswa
- Nama : Ibrahim Yusuf Laksono
- NIM : 241111033
- Kelas : A
- Dosen Pengampu : Restiadi Bayu Taruno, S.T., M.Eng.
- Program Studi : Informatika — Universitas Nahdlatul Ulama Yogyakarta

## Fitur Utama

A. Frontend (React.js + Ethers.js)
- Integrasi Wallet: Koneksi real-time dengan MetaMask.
- Smart Contract Interaction:
  - Fitur Donasi (Write transaction) dengan Gas Limit handling.
  - Menampilkan Total Donasi dan Riwayat Donatur(Read transaction) secara live dari blockchain.
- UI/UX Modern: Desain responsif dengan tombol donasi interaktif.
- Error Handling: Notifikasi alert jika transaksi gagal, ditolak user, atau saldo tidak cukup.

B. Backend (Node.js + Express)
- RESTful API: Endpoint `/api/transactions` untuk menyediakan data riwayat transaksi (simulasi database off-chain).
- CORS Enabled: Mengizinkan komunikasi data aman antara Frontend (port 3000) dan Backend (port 5000).

C. Kualitas Kode (Clean Code Implementation)
- Modular Architecture: Memecah UI menjadi komponen kecil (`WalletConnect`, `TransactionList`, `BalanceDisplay`).
- Separation of Concerns:
  - Frontend: Memisahkan konfigurasi ABI dan Contract Address ke file `contractConfig.js` agar `App.js` tetap bersih.
  - Backend: Memisahkan logic API ke folder `routes/transactions.js` agar `server.js` lebih rapi.

## Struktur Direktori Proyek
```text
UASPemWeb/
├── backend/
│   ├── routes/
│   │   └── transactions.js   # Logic API (Clean Code)
│   ├── server.js             # Entry point server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Komponen UI (Wallet, List, dll)
│   │   ├── contractConfig.js # Konfigurasi ABI & Address (Clean Code)
│   │   ├── App.js            # Logic utama aplikasi
│   │   └── index.css         # Styling global
│   └── package.json
│
├── smart-contracts/
│   └── DonationContract.sol  # File Solidity
└── README.md
```

## Cara Instalasi & Runningnya

Memerlukan
Node.Js
Git Untuk Clone Repository
MetaMas untuk wallet yang terhubng ke Sepolia Testnet

1. Clone Repository
Buka terminal dan masukan command
git clone https://github.com/BaimGG88/UAS_Praktikum_PemrogramanWeb_Web3Fullstack cd web3-dapp-uas

2. Setup dan Jalankan Backend serta Frondend menggunakan command 
 buka terminal terlebih dahulu
```bash
cd backend
npm install
node server.js
```
Output Sukses: Backend running on http://localhost:5000

buka terminal baru
```bash
cd frontend
npm install
npm start
```

Aplikasi akan otomatis terbuka di browser: http://localhost:3000

## Cara penggunaan Aplikasi
1. Pastikan backend dan frontend sudah berjalan.
2. Buka browser di http://localhost:3000.
3. Klik tombol Connect MetaMask (Pastikan Anda di jaringan Sepolia).
4. Pastikan Anda memiliki saldo Sepolia ETH (bisa didapat dari Faucet).
5. Klik tombol Donasi 0.001 ETH.
6. Konfirmasi transaksi di pop-up MetaMask.
7. Tunggu notifikasi sukses, dan data donasi akan muncul di daftar.
