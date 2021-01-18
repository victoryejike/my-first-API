const express = require('express');
const dotenv = require('dotenv');

//Load ENV file
dotenv.config({path: './config/config.env'});

//Initialize app with express
const app = express();

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`))