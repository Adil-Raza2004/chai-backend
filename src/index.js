// nodemon whenever we save our file it restarts the server, so install dev dependency
// npm i -D nodemon
//prettier.. used for combined coding
//dotenv, mongoose, express these pakage we need to install..
//mongoose connects us with mongodb
/*while dealing with database always use try and catch as it will help you to
   know the problem  and..... **also use async wait since db can the  far also it may take time*/

/*   this is the fiirst approach where we just used iffy , and also used try catch and also 
        used async, this is one way but it makes index .js  very clustered */
   //require('dotenv').config()  ... always write this line first, so that the environment variable is availabe as fat as possible
  // require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})










/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/