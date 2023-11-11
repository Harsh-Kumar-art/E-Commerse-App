module.exports = {
    getError: (errors, prop)=>{

        try{
    
            return errors.mapped()[prop].msg;  // errors.mapped gives an object of objects of errors
        } catch(err){
            return '';
        }
    }
};