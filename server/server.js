require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.DB_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/mongoose.config');
require('./routes/owner.routes')(app);
require('./routes/pet.routes')(app);
require('./routes/user.routes')(app);
require('./routes/inventory.routes')(app);
app.listen(process.env.DB_PORT, () => {
    console.log("Server's up.")
})