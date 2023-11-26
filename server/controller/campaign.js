
const Campaign = require('../model/campaign')

const createCampaign = async (req, res) => {
  try {
    const { name, address, goal, desc } = req.body;

    const campaign = await Campaign.create({name, address, goal, desc})

    res.status(200).json({ message: 'Campaign created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllCampaign = async(req, res) => {
    try {
        const campaigns = await Campaign.find()
    
        res.status(200).json({ campaigns })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCampaignById = async(req, res) => {
    const campaignId = req.params.campaignId
    try {
        const campaigns = await Campaign.findById(campaignId)

        if (!campaigns) {
            return res.status(404).json({ message: 'Campaign not found' })
        }
    
        res.status(200).json({ campaigns })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCampaign = async(req, res) => {
    const campaignId = req.params.campaignId
    const { name, address, goal, desc, currentFund } = req.body
    try {
        const campaigns = await Campaign.findByIdAndUpdate(campaignId, { name, address, goal, desc, currentFund })

        if (!campaigns) {
            return res.status(404).json({ message: 'Campaign not found' })
        }
    
        res.status(200).json({ message: 'Campaign updated successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addFund = async(req, res) => {
    const campaignId = req.params.campaignId
    const { fundToAdd } = req.body
    try {
        const campaign = await Campaign.findByIdAndUpdate(
            campaignId,
            { $inc: { currentFund: fundToAdd } }, 
            { new: true } 
        );

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
    
        res.status(200).json({ message: 'Campaign Fund added successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createCampaign,
    getAllCampaign,
    getCampaignById,
    updateCampaign,
    addFund
};
