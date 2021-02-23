import validator from 'validator'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const todoSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:[true ,"Please a todo Item should have a title"],
        unique:true
    },
    Description:{
       type:String,
       required:[true,'Please a todo item should have a description'],
       maxlength:50
    },
    Priority:{
        type:String,
        required:[true,'Please a indicate how priority is your todo item']
    },
    CreatedDate:{
        type:Date,
      CreatedAt: Date.now()
             
    } 
})

const Todo = mongoose.model('Todo',todoSchema)

export default Todo