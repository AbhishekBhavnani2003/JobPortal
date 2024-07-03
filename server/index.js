const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 5000;

const musername = encodeURIComponent(process.env.MONGO_USERNAME);
const mpassword = encodeURIComponent(process.env.MONGO_PASSWORD);
const path = `mongodb+srv://${musername}:${mpassword}@jobportal.pmfbpin.mongodb.net/?retryWrites=true&w=majority&appName=JobPortal`;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(path)
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/api/auth', postRoutes);

const applicationRotes = require('./routes/applicationRoutes')
app.use('/api/auth',applicationRotes)



app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
