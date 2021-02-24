/**
 * CATCH ERRORS FROM ASYNCHRONOUS FUNCTION
 * _______________________________________
 * @property {function} fn -Catch Erros from Asynchronous functions
 */

const catchAsync = fn=>{

    return (req,res,next)=>{

    fn(req,res,next).catch(next);
    }
   
}

export default catchAsync;