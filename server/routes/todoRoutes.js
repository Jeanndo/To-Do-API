import express from 'express';
import * as authController from '../controllers/authController'
import * as todoController from '../controllers/todoController';

const router = express.Router();

router
.route('/')
.post(authController.protect,todoController.createTodoItem)
.get(authController.protect,todoController.getAllTodoItems);

router
.route('/:id')
.get(authController.protect,todoController.getTodoItem)
.patch(authController.protect,todoController.updateTodoItem)
.delete(authController.protect,todoController.deleteTodoItem);


export default router ;




