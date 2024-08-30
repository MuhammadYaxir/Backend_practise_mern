import mongoose from "mongoose";

const userSchema = mongoose.Schema;
const user = new userSchema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
        minlength: [8,"atleast 8 characters required"],
      },
      role:{
        type:String,
        enum: ['user', 'admin', 'moderator'],  // Define the allowed values using enum
        default:"user",
      },
    },{
        timestamps:true,
    }
    );
    const User = mongoose.model("User",user);
    export default User;