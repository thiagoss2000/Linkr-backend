export function validateSchema (schema){
    
  return function(req, res, next){
        
    const { error } = schema.validate(req.body, { abortEarly: false });
       
    if (error) return res.status(422).send(error.details.map(({msg}) => msg));
        next();
    }
}
