const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const uri = process.env.DB_URL;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((error, connection) => {
            if(error) console.log(error);
            else {
                console.log("Connected!")
            }
        })

module.exports = {};