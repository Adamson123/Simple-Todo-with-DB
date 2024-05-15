const asyncWrapper = (afn) =>{
  return async (req,res,next) =>{
    try {
      await afn(req,res,next)

    } catch (error) {
     
      next(error)
    }
  }

}

module.exports = asyncWrapper;