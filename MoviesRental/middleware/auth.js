const jwt = require('jsonwebtoken')
const config = require('config')
function auth(req,res,next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Acceess deined . no token provided')

 
   try{
       //payload
    const decoded =   jwt.verify(token,config.get('jwtSecret'))
    req.user = decoded;
    next()
   }
   catch(ex){
        res.status(400).send('Invalid Token')
   }
    
}

module.exports = auth