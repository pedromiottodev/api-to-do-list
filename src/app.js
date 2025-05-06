import express from "express"
//"./"	Arquivo na mesma pasta
//"/"	Caminho absoluto desde o disco (Windows acha que é C:\routes.js)
import router from "./routes.js"
import log from "./middlewares/log.js"


const app = express()

app.use(log)
app.use(express.json())
app.use(router)

app.listen(3333, (req, res) =>{
    console.log("SERVIDOR ONLINE")
})