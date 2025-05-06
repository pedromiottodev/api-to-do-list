function log(req, res, next){
    const dataHora = new Date().toLocaleString('pt-BR')

    console.log(`[LOG] ${req.method} ${req.url} - ${dataHora}`)

    next()
}

export default log