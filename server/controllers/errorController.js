import AppError from "../utils/appError"; 

/**
 * JSON WEB TOKEN EXPIRATIION ERROR HANDLER
 * ________________________________________
 * @property {function} - Handles Token expiration errors by calling Global error Handler
 * see {@link  AppError }
 */
const handleTokenExpErr = () =>
  new AppError(401, "Your token is expired please login again!");

  /**
 * MONGO SERVER ERROR HANDLER
 *   ________________________________________
 * @property {function} - Handles Mongo Server errors by calling Global error Handler
 * see {@link  AppError }
 */
const handleMongoServerErr = () =>
  new AppError(
    408,
    "Your connection was interrupted! Please make sure you have good internet"
  );

  /**
 * INVALID JSON WEB TOKEN ERROR HANDLER
 *  ________________________________________
 * @property {function} - Handles Json web tokem errors by calling Global error Handler
 * see {@link  AppError }
 */
const handleJsonWebTokenError = () =>
  new AppError(401, "Invalid token please login again!.");

   /**
  *TWILIO ERROR HANDLER
 * ________________________________________
 * @property {function} - Handles handle Twilio Request errors by calling Global error Handler
 * see {@link  AppError }
 */
const handleTwilioRequestErr = () =>
  new AppError(
    401,
    "Too many requests sent to Twilio , Please try again after One day!."
  );

  /**
   * VERIFICATION CODE ERROR HANDLER
   * ________________________________________
 * @property {function} - Handles Verification Code errors by calling Global error Handler
 * see {@link  AppError }
 */
const handleVerificationCodeErr = () =>
  new AppError(
    401,
    "Expired Verification Code, Please request new Verification Code!."
  );

 /**
  * DUPLICATION ERROR HANDLER
  * ________________________________________
 * @property {function} - Handles Duplicate errors by calling Global error Handler
 * see {@link  AppError }
 */
const handleDuplicateFieldsErrorDB = () => {
  return new AppError(
    400,
    "Duplicate detected, Please try to use other values"
  );
};
   /**
    * CAST ERROR HANDLER
    * ________________________________________
 * @property {function} - Handles Cast errors by calling Global error Handler
 * see {@link  AppError }
 */
const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(400, message);
};
/**
 * VALIDATION ERROR HANDLER
 * ________________________________________
 * @property {function} - Handles Validation errors by calling Global error Handler
 * see {@link  AppError }
 */
const handleValidationErrorDB = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input. ${errors.join(".")}`;
  return new AppError(400, message);
};

  /**
   * SEND ERRORS DURING DEVELOPMENT
   * _______________________________________
 * @param {string} err - Error we Send to Developer during Development
 */

const sendErrorDev = (err,res)=>{

         res.status(err.statusCode).json({

        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack 
    })
      
}
 /**
  * SEND ERRORS DURING PRODUCTION
  * ___________________________________
 * @param {string} err - Error we Send to user during Production
 */
const sendErrorProd = (err,res)=>{

    //Operational , Trusted Erros : Send Message to client

    if(err.isOperational){

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message

    })

    //Programming or other unkown errors: don't leak error details to client
}else{

    //1. log error 

    console.error('ERROR 🔥 :',err)

    //2. send a generic message

    res.status(500).json({
        status:'error',
        message:'Some thing went verry wrong!'
    })
}

}

export const errorHandler= (err,req,res,next)=>{

    console.log(err.stack)
    err.statusCode = err.statusCode  || 500;
    err.status = err.status|| 'error'

    if(process.env.NODE_ENV === 'production') {
    let error = {...err};

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsErrorDB();
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError();
    if (error.name === "TokenExpiredError") error = handleTokenExpErr();
    if (error.name === "MongooseServerSelectionError")
      error = handleMongoServerErr();
    if (error.code === 20404) error = handleVerificationCodeErr();
    if (error.code === 20429) error = handleTwilioRequestErr();

     sendErrorProd(error,res);
    }else if(process.env.NODE_ENV === 'development'){
        
    
        sendErrorDev(err,res);
    }  
   
};