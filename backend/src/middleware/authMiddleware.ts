import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";


export interface AuthenticatedRequest extends Request {
    userId?:string;
}

export const authenticate = (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
    
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as {userId : string};
        req.userId = decoded.userId;
        next()
    }catch(error) {
        res.status(401).json({  
            message:"Unauthorized Invalid or expired token",
    })
  }
}