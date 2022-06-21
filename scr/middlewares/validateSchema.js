export function validateSchema (schema){
    
  return async function(req, res, next){
    try{   
      const { error } = schema.validate(req.body, { abortEarly: false });
        
      if (error) return res.status(422).send(error.details.map(({message}) => message))
      next();
      }
      catch (err) {
        console.log(chalk.red(`ERROR VALIDATING DATA: ${err}`));
        res.status(500).send({ error: err.message });
      }
    }

}
