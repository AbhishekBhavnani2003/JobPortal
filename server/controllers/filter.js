const post = require('../models/postModel')

// acc to category 

const categoryfilter = async (req,res) =>
{
    const {category} = req.body
    const response = await post.find({category : category}) 

    if(response) 
    {
       return res.status(200).json(response)
    }
    else{
        return res.status(404).json({ msg: ' Post not found ' })
    }
}


// acc to gender 


const genderfilter = async (req,res) =>
    {
        const {gender} = req.body
        const response = await post.find({gender : gender}) 
    
        if(response) 
        {
           return res.status(200).json(response)
        }
        else{
            return res.status(404).json({ msg: ' Post not found ' })
        }
    }


// acc to experience 


const expfilter = async (req,res) =>
    {
        const {exp} = req.body
        const response = await post.find({experience : exp}) 
    
        if(response) 
        {
           return res.status(200).json(response)
        }
        else{
            return res.status(404).json({ msg: ' Post not found ' })
        }
    }



module.exports = {
    categoryfilter , 
    genderfilter , 
    expfilter
}