const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')

//Route files
const bootcamps = require('./routes/bootcamps')

//Load ENV file
dotenv.config({path: './config/config.env'});

//Initialize app with express
const app = express();

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Mount routers 
app.use('/api/v1/bootcamps', bootcamps);



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`))