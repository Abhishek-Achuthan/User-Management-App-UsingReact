import User from "../../models/User";
import { Request,Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";


export const getUserprofile = async (req: Request,res: Response) =>{
    console.log(req.body)
}


export const updateUserProfile = async(req : AuthenticatedRequest, res : Response) => {
    console.log("Updating")
    let userId = req.userId
    
    if(userId == null) {
        userId = req.body._id
    }
    const {name,email,phone,image} = req.body;
    console.log(req.body, userId)
    try {

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {username :name , email, phone,image},
            {new:true}
        );
        console.log(updateUser)
        if(!updateUser) {
            res.status(404).json({
                messsage:"User not found"
            })
        }else{
        res.json(updateUser);
        }

    }catch(err) {
        console.error("Error updating user",err);
        res.status(500).json({message:'Server error'});
    }
}
