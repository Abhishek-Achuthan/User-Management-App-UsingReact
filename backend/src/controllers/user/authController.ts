import { Request,Response} from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req : Request,res : Response):Promise<void>  => {
    const {username,email,phone,password,image} = req.body;
    console.log(req.body)
    try {

        const userExists = await User.findOne({email});
        if(userExists) {
             res.status(400).json({
                message: "User already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User( {
            username,
            email,
            phone,
            password : hashedPassword,
            image
        });

        await user.save();
        res.status(201).json({
            message:'User registered successfully',
        })

    }catch(err:any){
        res.status(500).json({
            message : "Internal server error",err: err.message
        })
    }
}

    export const loginUser = async (req: Request,res : Response):Promise<void> =>{
        const {email,password} = req.body;

    try {

        const user = await User.findOne({email});

        if(!user) {
             res.status(400).json({
                message: "Invalid credentials",
            })
            return
        }

        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch) {
             res.status(400).json({
                message : "invalid credentials"
            })
            return 
        }

        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET as string, {
            expiresIn : '15m'
        });

        res.status(200).json({
            message : "Login successful",
            token,
            email : user.email,
            phone : user.phone,
            name : user.username,
            image : user.image
        })  
    } catch (error) {
        res.status(500).json({
            message : "Internal server error",
            error : (error as Error).message
        }) 
    }
}