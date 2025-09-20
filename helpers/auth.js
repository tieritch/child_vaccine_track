function authenticate(context){
  console.log('context user***********************************************************************************************:',context.user)
    if(!context.user){
        const error = new Error("Unauthorized");
        error.code = 401;
        throw error;
      }
}
module.exports=authenticate