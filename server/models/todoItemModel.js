import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

/**
 * TODO-ITEM MODEL
 *  ______________________
 * @param  {string}   Todo  -Todo-Item Model
 * @property {function} todoSchema-Todo-Item Shema
 * @property {string} Title        -Todo-Item Title
 * @property {string} Description  -Todo-Item Decription
 * @property {string} Priority     -Todo-Item Priority
 * @property {string} CreatedDate  -Date when Todo-Item Created
 * @property {string} ModifiedDate -Date when Todo-Item Updated
 */

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
        type:Date
            
    },
    ModifiedDate:{
        type:Date
      
             
    },

})

const Todo = mongoose.model('Todo',todoSchema)

export default Todo