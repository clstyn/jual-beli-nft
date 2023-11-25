# Tugas Proyek Teknologi Blockchain

Marketplace NFT sebagai platform jual beli dan penggalangan dana (crowdfunding)

## Cara run di localhost

Setelah melakukan clone ke local, jalankan perintah - perintah berikut

1. Menginstall dependencies

```
npm install
```

2. Mengatur variabel environment

```
// Buatlah file .env dan isi dengan nilai - nilai seperti berikut
// Sebelumnya buatlah project Web3 dan project IPFS pada Infura

INFURA_PID = Infura IPFS Project ID Anda disini
INFURA_API = Infura IPFS Project API KEY Anda disini

PRIVATE_KEY = Private Key Wallet Anda disini
ENDPOINT_URL = Endpoint url dari Infura Web3 Project Anda disini
```

3. Kompilasi smart contract

```
npx hardhat compile
```

4. Melakukan deployment smart contract

```
// Pada development server
npx hardhat node
npx hardhat run --network development scripts/deploy_contract.js

// Pada testnet
npx hardhat run --network sepolia scripts/deploy_contract.js
```

2. Menjalankan aplikasi React

```
npm start
```
