const mongoose = require('mongoose');
const database = async()=>{
    try{
        await mongoose.connect("mongodb+srv://Aman:Aman111@agrahari111.yqi9omp.mongodb.net/DsaVisualizer");
    }
    catch(err){
        console.log("error in mongodb : " + err);
    }
}

module.exports = database;