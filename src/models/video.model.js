    //here i am creating a model of the vedio from the image provided
    /*we are installing mongoose aggregate paginate..to use complex mongoDb querry
      we can use many middleware in mongodb as a plugin*/
import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // from cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //from cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, //we will get it from cloudinary ,as soon as we upload the file it gives us the file info from there wecan easily get it 
            required: true
        },
        views: {        // initial we will keep it 0, it will keep on increasing
            type: Number,
            default: 0
        },
        isPublished: { // boolean flag to know the vedio is publickly available or not 
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)
/* in mongoose we can write multiple middleware as a plugin 
  eg.. pre or post to just do something just before or just after
  ** also here we */
 // just for fun..