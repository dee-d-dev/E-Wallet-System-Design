const mongoose = require("mongoose");

const db_connection = async (url) => {
  console.log(url)
  try{
    await mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    
    );
    
    console.log("db connected successfully");
  
  }catch(err){
    console.log('Error connecting to the database')
  }
  
};

module.exports = db_connection;
