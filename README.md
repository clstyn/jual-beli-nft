# PStore NFT Marketplace

Website to sell and purchase NFTs

## Prerequisites

- You need a Metamask Wallet to use this Web3 Application. Install the [extension](https://metamask.io/download/) and setup your wallet. 
- You will also need to setup [Infura](https://app.infura.io/login) account to create new IPFS project and Web3 project. 
- Create an env file using the example provided.

## How to run in localhost

After cloning to your local machine, try running these following commands

**Installing dependencies**

```
npm install 
```

**Deploying the smart contract (backend) to local testnet**

```
ganache-cli -d
truffle migrate --reset --network development
```

To test the smart contract
```
truffle test
```

To deploy to a public testnet (Goerli) use this command
```
truffle migrate --network goerli
```

You can configure your own public testnet preferences in truffle-config

**Running application (frontend)**

```
npm start
```

