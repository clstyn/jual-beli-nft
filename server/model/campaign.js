
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const campaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  goal: {
    type: Number,
    required: true
  },
  desc: {
    type: String
  },
  currentFund: {
    type: Number,
    default: 0
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign
