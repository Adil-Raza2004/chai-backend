//from express mostly apps are made
// app.use when we use middleware &configration..   npm i cookie-parser cors also done
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"// after install it import it 

const app =express()//all properties are transferred through method,also we need to config it both

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//these are the major 3 configration which needs to be done
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(express.static("public"))
//the main use of cookie-parser is that we can access and set cookies  of the user browser from our server CRUD operation can be performrd
app.use(cookieParser())
export {app}