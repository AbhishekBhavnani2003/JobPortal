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

// get the applicants 

const applicants = async(req,res) => 
{
    try {
        const sppost = await applied.find({ postid: `${req.params.id}`})
        return res.status(200).json(sppost)
    } catch (error) {
        res.status(500).json({ message: 'Server not supported', error });
    }
}

// putting the status 
const statusapply = async (req, res) => {
    try {
        const { status } = req.body;
        const postExists = await applied.findById(req.params.id);
      
        if (!postExists) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        const updatedApplication = await applied.findByIdAndUpdate(
            req.params.id,
            { $set: { status: status } },
            { new: true }
        );
        console.log("Updated application:", updatedApplication);

        if (!updatedApplication) {
            return res.status(404).json({ msg: 'Application not found' });
        }

        return res.status(200).json({ msg: "Status updated successfully", updatedApplication });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// get applicant by name 

const applicationbyname = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ msg: 'Name is required' });
        }

        const response = await applied.find({ name: name });

        if (response && response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = 
{
    application , 
    applicants , 
    statusapply , 
    applicationbyname
}