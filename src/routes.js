import express from "express"
import validarTarefa from "./middlewares/validarTarefa.js"
import validarAtualizacao from "./middlewares/validarAtualizacao.js"
import validarExclusao from "./middlewares/validarExclusao.js"
import prisma from "./prisma/prismaClient.js"

const router = express.Router()

let tarefas = []

router.get("/tarefas", async (req, res) => {
    const tarefas = await prisma.tarefa.findMany()
    return res.status(200).json(tarefas)
})

router.post("/tarefas", validarTarefa, async (req, res) => {
    const { titulo, descricao } = req.body
    //create: método que cria um novo registro no banco, ou seja, insere uma nova linha na tabela.
    const tarefa = await prisma.tarefa.create({
        //dentro do data nós passamos os dados que serão salvos no banco
        data: {
            titulo,
            descricao,
            concluido: false
        }
    })

    return res.status(201).json(tarefa)
})

router.put("/tarefas/:id", validarAtualizacao, async (req, res) => {
    const id = Number(req.params.id)
    const { titulo, descricao } = req.body

    try {
        const tarefaAtualizada = await prisma.tarefa.update({
            where: { id },
            data: {
                //É um jeito inteligente de só incluir no objeto data os campos que o usuário enviou.
                /*
                {
                    "titulo": "Novo título"
                    }
                    Então:
                    ...(titulo && { titulo })  → { titulo: "Novo título" }
                    ...(descricao && { descricao })  → false (não entra no objeto)
                */
                ...(titulo && { titulo }),
                ...(descricao && { descricao })
            }
        })

        return res.status(200).json(tarefaAtualizada)
    }
    catch (error) {
        return res.status(400).json({ "mensagem": "tarefa não encontrada" })
    }
})

router.delete("/tarefas/:id", validarExclusao, async (req, res) => {
        const id = Number(req.params.id)

        try{
            await prisma.tarefa.delete({
                where: {id}
            })
            return res.status(200).json({mensagem: "Tarefa apagada com sucesso"})
        }
        catch(error){
            return res.status(404).json({ "mensagem": "Tarefa apagada com sucesso" })
        }
})

    export default router