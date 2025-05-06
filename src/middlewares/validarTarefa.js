function validarTarefa(req, res, next){
    const {titulo, descricao} = req.body

    if(!titulo){
        return res.status(400).json({"mensagem": "Informe um título"})
    }

    if(!descricao){
        return res.status(400).json({"mensagem": "Informe uma descricao"})
    }

    const id = Date.now()
    const concluida = false
        
    req.tarefaCriada = {id, titulo, descricao, concluida}

    next()
}

export default validarTarefa

/*
A alteração (atualização dos dados da tarefa) deve ser feita na ROTA.
O middleware serve apenas para validar se os dados enviados estão corretos.
*/