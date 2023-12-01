const ethers = require('ethers')
require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')  
const cors = require('cors')

// const API_URL = process.env.API_URL
// const PRIVATE_KEY = process.env.PRIVATE_KEY
// const contractAddress = process.env.CONTRACT_ADDRESS

// const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL)

// const signer = new ethers.Wallet(PRIVATE_KEY, provider)
// const {abi} = require("../artifacts/contracts/PStoreNFTv2.sol/PStoreNFTv2.json")
// const contractInstance = new ethers.Contract(contractAddress, abi, signer)

const campaign = require('./routes/campaign')

const app = express()
app.use(express.json())

// cors origin
const allowedOrigins = ['localhost', 'postman-origin'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('API is working')
})
app.use('/campaign', campaign)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}`)
        })
    })
    .catch(err => console.log(err))