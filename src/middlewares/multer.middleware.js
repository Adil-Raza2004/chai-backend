// we will make a middleware with the help of multer by this whenever there is file uploding capablity there we will inject this multer 
import multer from "multer"
//we are using disk storage and not memory storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})