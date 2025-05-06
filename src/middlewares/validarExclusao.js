function validarExclusao(req, res, next){
    if(!req.params.id){
        return res.status(400).json({"mensagem": "Informe um Id"})
    }

    next()
}

export default validarExclusao