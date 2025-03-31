const asynchandelar=(requsthandelar)=>{

   return (req,res,next)=>{
        Promise.resolve(requsthandelar(req,res,next)).catch((err)=>next(err))
    }

}
export {asynchandelar}