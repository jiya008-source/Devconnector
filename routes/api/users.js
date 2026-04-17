const express=require('express');
const { check,validationResult } = require('express-validator');
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const User=require('../../models/User');

//@route GET api/users
//@description Register user
//@access Public
//router.get('/',(req,res)=>res.send('User route'));

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})

],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,password}=req.body;
    try{
    //See if user exists
       let user=await User.findOne({email});
       if(user){
        return res.status(400).json({errors:[{msg:'User already exists'}]});
       }
    //Get users gravatar
       const avatar=gravatar.url(email,{
        s:'200',//default size
        r:'pg',//rating(no bad images)
        d:'mm'//default mm gives default user icone
       })
       user=new User({
        name,
        email,
        avatar,
        password
       });
    //Encrypt password using bcrypt
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(password,salt);
    await user.save();

    //Return json web token- when a user registers we want him to be logged in right away
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