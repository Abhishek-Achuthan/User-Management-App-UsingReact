import { Request,Response } from "express";
import  jwt  from "jsonwebtoken";

export const adminLogin = async(req : Request,res:Response):Promise<void> => {
    const {name,password} = req.body;
    

    const adminName = process.env.ADMIN_NAME
    const adminPass = process.env.ADMIN_PASS
    const secretKey = process.env.JWT_SECRET as string;

    if(name===adminName&&password===adminPass) {
        const token = jwt.sign({role:"admin",name},secretKey,{expiresIn:"1d"}     
        );
        console.log("helloo iam reached here")

        res.status(200).json({message:"Login successfull",token});
    }else{
        res.status(401).json({message:"invald credentials"});
    }
}