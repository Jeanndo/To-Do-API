import express from "express";
import bodyParser from "body-parser";
import compression from "compression"
import userRouter from "./routes/userRoutes"
import todoRouter from "./routes/todoRoutes"
import * as globalErrorHandler from './controllers/errorController'
import AppError from './utils/appError';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(compression())

app.get('/', (req,res)=>{res.status(200).send({
    status:200,
    message:'welcome to Todo App',
})})

app.use((req,res,next)=>{

    req.requestTime = new Date().toDateString();
    console.log(req.hearders);
    next()
})



app.use("/api/v1/todo/users",userRouter)
app.use("/api/v1/todoitem",todoRouter)

app.all('*',(req,res,next)=>{

next(new AppError(`can't find ${req.originalUrl} on this server`,404)) 
})
 
app.use(globalErrorHandler.errorHandler);
export default app;