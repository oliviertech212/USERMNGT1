
import  Jwt  from "jsonwebtoken";
export const verifyUser= async (req, res, next) =>{
       try {

        const authHeader = await req.headers.token;
        if (authHeader) {
          Jwt.verify(authHeader, process.env.secret, (err, user) => {
            if (err) res.status(403).json(`Token is not valid! ${err}`);
            if (!user) res.status(403).json(`user not found`);
            req.user = user;
            next();
          });
        } 

        if(! authHeader) res.status(403).json(`user not found`);
        
        
       } catch (error) {
         console.log(error.message);
       }

}