import User from "../../models/User";
import { Request,Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";


export const listUsers = async(req:AuthenticatedRequest ,res:Response) => {

    try {
        const users = await User.find({})
    
        res.status(200).json(users);
    }catch(error) {
        console.log("Error fetching users: " ,error)
        res.status(500).json({message : "Server error while fetching the request" })
    }
}

export const deleteUser = async (req : AuthenticatedRequest , res : Response) => {

    try {
        const {_id} = req.query

        if(_id) {
            await User.findByIdAndDelete({_id})
        }
        res.status(200).json({message:'Deleted'});
    }catch{
        console.log("Cannot find the user")
    }
}