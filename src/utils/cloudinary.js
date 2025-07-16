// this will be a reusable code
/*we will usw cloudinary and multer to upload the file in backend
with use of multer we will take the file from user & keep it in the local server temperorly 
&from there we will upload it in  cloudinary*/


/*here we are just trying that, we will get the file on the local
 server and here it will give the local path of it and 
 and then we will upload it in cloudinary, **also once we uploaded 
 successfully we also need to remove it from our server since it no use now*/

import { v2 as cloudinary } from "cloudinary" /*cloudinary.config(...);
                                               cloudinary.uploader.upload(...);*/
import fs from "fs"/* file system comes by default with node.js , no need to import** 
                    fs help us to do varios things with the file manage the file, 
                    eg. open , read,file path, unlist(means delete)etc.*/
cloudinary.config({     // we will keep it in the env since it svery sensetive data , configration only gives permission to upload file 
  cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
  api_key: 'process.env.CLOUDINARY_API_KEY', 
  api_secret: 'process.env.CLOUDINARY_API_SECRET'//we are doing it since we not want everyone to know things 
});
 // whenever there is a scope of error use try & catch
 const uploadOnCloudinary = async (localFilePath) => {
    try {
         if (!localFilePath) return null
         //upload the file on cloudinary
         const responce=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
         })
         //file has been uploded
         console.log("file uploded on cloudinary",
            response.url);
            return response
    } catch(error){  /**using unlink option of fs */
        fs.unlinkSync(localFilePath)//now we know that we have the file in the local storage and not uploded ,we need to remove it from our server  since many will be currept file
        return null;
    }
 }
 export {uploadOnCloudinary}