const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url=process.env.Mongodb_url;

mongoose.connect(mongo_url)
  .then(()=>{
    console.log('Mongodb is connected');
  }).catch((err)=>{
    console.log('Mongodb is not connected',err);
  })

module.exports=mongoose;