class customError extends Error{
  constructor(message,status){
    super(message),
    this.status= status
  }
}

const createErrorMessage = (message,status) =>{
 return new customError(message,status)
}

module.exports = {customError, createErrorMessage}