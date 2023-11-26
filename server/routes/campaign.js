const express = require('express')
const router = express.Router()
const { createCampaign, getAllCampaign, getCampaignById, updateCampaign, addFund } = require('../controller/campaign')

// DESC     : Create a campaign
// ROUTE    : POST "/campaign"  
// PARAMS   : None
// BODY     : name, address, goal, desc, currentFund
// RESPONSE : 
router.post('/', createCampaign)

// DESC     : Add fund to currentFund
// ROUTE    : PATCH "/campaign/:campaignId"  
// PARAMS   : campaignId
// BODY     : fundToAdd (number)
// RESPONSE : 
router.patch('/:campaignId', addFund)

// DESC     : Get all campaign
// ROUTE    : GET "/campaign/"  
// PARAMS   : campaignId
// BODY     : none
// RESPONSE : 
router.get('/', getAllCampaign)

// DESC     : Get campaign bg id
// ROUTE    : GET "/campaign/:postId"  
// PARAMS   : campaignId
// BODY     : none
// RESPONSE : 
router.get('/:campaignId', getCampaignById)

// DESC     : Update campaign bg id
// ROUTE    : PUT "/campaign/:postId"  
// PARAMS   : campaignId
// BODY     : name, address, goal, desc, currentFund
// RESPONSE : 
router.put('/:campaignId', updateCampaign)

module.exports = router