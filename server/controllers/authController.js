const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ error: 'Email is already registered' });
        }
        const salt = await bcrypt.genSalt();
        const hashedpwd = await bcrypt.hash(password, salt);
        const newUser = new User({ name, password: hashedpwd, email });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server not supported', error });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const accesstoken = jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '1h' });
            const refreshtoken = jwt.sign(user.toJSON(), process.env.REFRESH_KEY);
            const newToken = new Token({ token: refreshtoken });
            await newToken.save();
            return res.status(200).json({ accesstoken, name: user.name, refreshtoken });
        } else {
            res.status(404).json({ message: "Invalid Credentials" });
        }
    } else {
        return res.status(404).json({ message: "User Not Found" });
    }
};

module.exports = {
    signup,
    login
};
