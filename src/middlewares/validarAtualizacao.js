function validarAtualizacao(req, res, next){
    const {titulo, descricao} = req.body

    if(!titulo && !descricao){
        return res.status(400).json({ mensagem: "Informe ao menos um campo para atualizar" })
    }

    next()
}

export default validarAtualizacao

//O middleware deve só validar os dados enviados no body