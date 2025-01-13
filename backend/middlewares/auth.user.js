
import jwt from "jsonwebtoken";
export const authUser = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.json({
                success: false,
                message: "Invalid User"
            })
        }
        const token_decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = token_decoded.id;
        next();
    }catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}