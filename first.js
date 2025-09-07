const express = require("express");
const database = require("./database/mongodg");
const app = express();
const cookieParser =  require('cookie-parser');
const userRouter = require("./router.js/userRouter")
const redisClient = require("./database/redis")
app.use(cookieParser());
const cors = require("cors")
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}))

app.use(express.json());


app.use("/user",userRouter);





const instialization=async()=>{
    try{
        
        await Promise.all([database(),redisClient.connect()]);
        console.log("database connect");
        app.listen(1500,(req,res)=>{
            console.log("i am listening at port no 1500");
        })
    }
    catch(err){
        console.log("database connection err : ", err);
    }
}

instialization();
