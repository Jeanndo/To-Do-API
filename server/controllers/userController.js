import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';

export const createUser = catchAsync(async (req,res,next)=>{

    const newUser = await User.create(req.body);
    req.requestTime = new Date().toDateString()
    res.status(201).json({
        message:'user created successfully',
        status:'success',
        createdAt:req.requestTime,
        data:{
            newUser
        }
    })
})


export const getAllUsers = catchAsync(async (req,res,next)=>{

    const users = await User.find();
    req.requestTime = new Date().toDateString()
    
    res.status(200).json({
      status:'success',
      createdAt:req.requestTime,
      data:{
        users
      }
    })
})


export const getUser = catchAsync(async (req,res,next)=>{

    const user = await User.findById(req.params.id)
    req.requestTime = new Date().toDateString()
    res.status(200).json({
        status:'success',
        createdAt:req.requestTime,
        data:{
            user
        }
      })
})


export const deleteUser =  catchAsync(async (req,res,next)=>{

    await User.findByIdAndDelete(req.params.id)
    req.requestTime = new Date().toDateString()
    
    res.status(200).json({
        status:'success',
        message:'user deleted successfully',
        deletedAt:req.requestTime,
        data:{
           user:{} 
        }
      })
})

export const updateUser = catchAsync(async (req,res,next)=>{

    const user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    req.requestTime = new Date().toDateString()
    res.status(200).json({
        status:'success',
        message:'user updated successfully',
        updatedAt:req.requestTime,
        data:{
            user
        }
      })
})