const applied = require('../models/applyModel')

// apply

const application = async (req,res) => 
    {
        try {
            const newapp = await new applied(req.body) 
            await newapp.save() ; 
            console.log("application saved successfully:", newapp);
            return res.status(200).json(' Applied in Job successfully ')
            
        } catch (error) {
            res.status(500).json({ message: 'Server not supported', error });
        }
    }


module.exports = 
{
    application
}