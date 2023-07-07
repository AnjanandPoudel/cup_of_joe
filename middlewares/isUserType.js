exports.isOwner=(req,res,next)=>{
    try {
        if (!req.admin) {
            throw new SetErrorResponse("You must be Owner to Access this.", 401);
          }
        next()
    } catch (error) {
        res.fail(error)
    }
}
exports.isUser=(req,res,next)=>{
    try {
        if (!req.user) {
            throw new SetErrorResponse("Only Users can Access this.", 401);
          }
        next()
    } catch (error) {
        res.fail(error)
    }
}