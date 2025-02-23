import jwt from 'jsonwebtoken';

export const authAdmin = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.json({
                success: false,
                message: "Please login first"
            })
        }
        const token_decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decoded!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({
                success: false,
                message: "Please login first"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}