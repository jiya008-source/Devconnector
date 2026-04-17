const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcryptjs');

//@route GET api/auth
//@description Test Route
//@access Public
router.get('/',auth,async(req,res)=>{
    try{
       const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route POST api/auth
//@description Authenticate user and get token
//@access Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    const {email,password}=req.body;
    try{
         let user=await User.findOne({email});
        if(!user){
            return res.staus(400).json({error:[{msg:'Invalid credentials'}]});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }
        const payload={
                user:{
                    id:user.id
                }
            }
        //jwt token contains header and payload which has id and intialisation date and expiry date
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000000},(err,token)=>{
            if(err)throw err;
            res.json({token});
                    });
      
    }catch(err){
       console.error(err.message);
        return res.status(500).send('Server error');
    }
})

module.exports=router;