import {promisify} from 'util'
import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError'
import jwt from 'jsonwebtoken'

/**
 * Sign Josn web Token
 * @param {string} id - this user id is used as a payLoad for generating a jwt
 * 
 */
const signToken = id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}


export const signUp = catchAsync(async (req,res,next)=>{

    //const user = await User.create(req.body);

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        gender:req.body.gender,
        jobRole:req.body.jobRole,
        department:req.body.department,
        address:req.body.address
    });

   
    const token = signToken(user._id);
   
    res.status(201).json({
        status:'success',
        message:'User created successfully',
        token,
        data:{
            user 
        }
    })
})

export const login = catchAsync(async(req,res,next)=>{

    const {email,password} = req.body
   
    if(!email || !password){

    return next(new AppError("Please provide an email and password",400));
    }

    const user = await User.findOne({email}).select('+password');

    //const correctPass = await User.checkPassword(password,User.password)

    if(!user || !(await user.checkPassword(password,user.password)))
    {
        return next(new AppError("Invaild email or password",401));
    }
    //console.log(user);

    const token = signToken(user._id);

    res.status(202).json({
        status:'success',
        message:'User is successfully logged in',
        token
       
    })
   
})


export const protect = catchAsync( async (req,res,next)=>{

    let token;
     
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
   
    token = req.headers.authorization.split(' ')[1];
   }

   console.log(token)

  
   if(!token){
       return  next(new AppError('You are not loged in , Please login to have an accsess',401))

  }

  
  const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
  console.log(decoded)

     next()

})
