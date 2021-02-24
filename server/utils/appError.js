
class AppError extends Error{

     /** 
     * GLOBAL ERROR HANDLER
     * ___________________________________
     * @param {Object} message -Global Error Message
     * @param {Object} statusCode -Status-code comes with error message
     * 
     */
    constructor(message,statusCode){

        super(message);
       
        this.statusCode = statusCode;
        /**
         * @property {string} status -Error message generated according to status code
         */
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        /**
         * @property {boolean} isOperational -Indicates Errors happened in production
         */
        this.isOperational = true;

        Error.captureStackTrace(this,this.constructor)
    }
}

export default AppError