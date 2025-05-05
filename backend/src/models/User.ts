import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username : string;
    email : string;
    phone : string;
    password : string;
    image : string;
}

const userSchema : Schema<IUser> = new Schema(
    {
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    phone : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    image : {
        type : String,
        required : true
    }
}, {
    timestamps: true,
   }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;