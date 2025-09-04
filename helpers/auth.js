function isAuthenticated(context){
    if(!context.user){
        const error = new Error("Unauthorized");
        error.code = 401;
        throw error;
      }
}
module.exports={isAuthenticated}