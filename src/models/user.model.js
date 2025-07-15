 //here i am creating a model of the user through the model sheet provided..
 //bcrypt understand about it..install bcrypt..and json web token(it encrypts our information )
 import mongoose, {Schema} from "mongoose";
 import jwt from "jsonwebtoken"  //since we installed it,
 import bcrypt from "bcrypt"//helps to hash your password
 const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //using cloudinary url it gives a url of any image or file
            required:true,
        },
        coverImage:{
            type:String,
            required:true,
        },
        watchHistory:[  // its and array since we are storing multiple values
            {
                type:Schema.Types.ObjectId,//since watch history is dependent on vedio we are doing this
                ref:"Video"
            }
        ],
        password:{
            type:String,/* here need to focus,bcrypt here it helps to hash your password
                          also since we need to decrypt the password also*/
            required:[true,'password is required'],
        },
        refreshToken:{
            type:String,
        },


    },
    {              //created a second object 
        timeStamps:true // we can know from here created at and updated at

    }
)

userSchema.pre("save" ,async function (next){ // this is a hook
    if(this.isModified("password")) return next();// here it will encrypt the password every time,whenever we change anything in the details and we dont want this, so we used this if statement
    this.password=bcrypt.hash(this.password,10)
    next()
})
//here we are making custom method in mongoDB
userSchema.methods.isPasswordCorrect = async function 
(password){
    return await bcrypt.compare(password, this.password)
}
/*now with this same method we can also make various custom methods 
  so here we are making a method to generate access token */

 userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
/*now with this same method we can also make various custom methods 
  so here we are making a method to generate refresh token */
/* now we want to encrypt for this we will use a hook from mmongoose . middleware
  here using "pre" hook its main use is */
 export const User = mongoose.model("User",userSchema)