const post = require('../models/postModel')
const user = require('../models/userModel')

// post controller

const newpost = async (req, res) => {
    try {
        const newpost = await new post(req.body)
        await newpost.save();

        console.log("Post saved successfully:", newpost);
        return res.status(200).json(' Post saved successfully ')

    } catch (error) {
        res.status(500).json({ message: 'Server not supported', error });
    }
}

// get all post 

const displaypost = async (req, res) => {
    try {
        const query = await post.find({})
        return res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ message: 'Server not supported', error });
    }
}

// update post 

const updatepost = async (req, res) => {
    try {
        const response = await post.findById(req.params.id)
        const name = req.user.name;
        if (!response) {
            return res.status(404).json({ msg: ' Post not found ' })
        }
        const updatedPost = {
            ...req.body,
            createdby: name
        };

        await post.findByIdAndUpdate(req.params.id, { $set: updatedPost })
        return res.status(200).json({ msg: " Post updated successfully " })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}


// delete post 

const deletePost = async (req, res) => {
    try {
        const dpost = await post.findByIdAndDelete(req.params.id)
        return res.status(200).json({ msg: 'Post deleted successfully ' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// get post by id 

const postbyid = async (req, res) => {
    try {
        const sppost = await post.findById(req.params.id)
        return res.status(200).json(sppost)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


// get post by name 

const postbyname = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ msg: 'Name is required' });
        }

        const response = await post.find({ createdby: name });

        if (response && response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    newpost,
    displaypost,
    updatepost,
    deletePost,
    postbyid,
    postbyname
};
