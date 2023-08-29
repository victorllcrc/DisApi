const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(
        "mongodb://admin:adminsisdis@ac-zfxs25s-shard-00-00.spkzqnf.mongodb.net:27017,ac-zfxs25s-shard-00-01.spkzqnf.mongodb.net:27017,ac-zfxs25s-shard-00-02.spkzqnf.mongodb.net:27017/?ssl=true&replicaSet=atlas-xpodvc-shard-0&authSource=admin&retryWrites=true&w=majority", 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB