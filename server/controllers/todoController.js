import TodoItem from '../models/todoItemModel'
import cathchAsync from '../utils/catchAsync'

export const createTodoItem = cathchAsync(async(req,res,next)=>{
    
    const todoItem = await TodoItem.create({
        Title: req.body.Title,
        Description:req.body.Description,
        Priority:req.body.Priority,
        CreatedDate:req.requesTime = new Date().toDateString()

     
    })
    
    res.status(201).json({
        status:'success',
        data:{
            todoItem
        }
    })
})


export const getAllTodoItems = cathchAsync(async (req,res,next)=>{

    const todoItems = await TodoItem.find();

    res.status(200).json({
      status:'success',
      data:{
        todoItems
      }
    })
})

export const getTodoItem = cathchAsync(async (req,res,next)=>{

    const todoItem = await TodoItem.findById(req.params.id)

    res.status(200).json({
        status:'success',
        data:{
            todoItem
        }
      })
})


export const deleteTodoItem = cathchAsync(async (req,res,next)=>{
    
    await TodoItem.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status:'success',
        data:{
            todoItem:{
                message:'Todo Item deleted Successfully'
            }
        }
      })
})

export const updateTodoItem =  cathchAsync(async (req,res,next)=>{

      const todoItemUpdated ={
        Title: req.body.Title,
        Description:req.body.Description,
        Priority:req.body.Priority,
        ModifiedDate:req.requesTime = new Date().toDateString()
      }

    const todoItem = await TodoItem.findByIdAndUpdate(req.params.id,todoItemUpdated,{
        new:true,
        runValidators:true
    })
console.log(todoItemUpdated)
    res.status(200).json({
        status:'success',
        message:'updated successfully',
        data:{
          
            todoItem
        }
      })
})