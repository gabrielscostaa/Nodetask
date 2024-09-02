 const validateBody = (request, response, next) => {
    const { body } = request;

        if(body.title == undefined){
            return response.status(400).json({ message: "O campo title é obrigatório" }); 
        }

     if(body.title == ''){
            return response.status(400).json({ message: "O campo title não pode ser Vazio" }); 
        }

 }

 module.exports = {
    validateBody,
 }