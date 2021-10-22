const passport = require('passport')
require('../config/passport')
const{StatusCode}=require('../config/constants')

const guard = (req, res, next) =>{
    passport.authenticate('jwt',{session:false},(error,user)=>{
        const token = req.get('Authorization')?.split('')[1]
        if (!user || err || token !== user.token){

            return res.status(StatusCode.UN_AUTHORIZED).json({
                status:'error',
                code:StatusCode.UN_AUTHORIZED,
                message: 'Invalid credentials'
            })
        }
        req.user = user
        return next()
    })(req, res, next)
}
module.exports = guard
