const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODBURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));