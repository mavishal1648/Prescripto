import jwt from "jsonwebtoken";

const authDoctor = async(req,res,next)=>{
    try {
        
        const token = req.headers.authorization;
        if(!token){
            return res.json({
                success: false,
                message: "Please login first"
            })
        }
        const token_decoded = jwt.verify(token,process.env.JWT_SECRET);  
        req.docId = token_decoded.id;
        next();  
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}
export default authDoctor;