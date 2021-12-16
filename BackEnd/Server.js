const app = require('./app')
const dotenv = require("dotenv")
const ConnectDB = require('./DB/DataBaseConnection')

dotenv.config({path:'Backend/config/.env'})
const PORT = process.env.PORT

ConnectDB()

app.listen(PORT, ()=>{
    console.log(`Server Started At : ${process.env.PORT}`);
})
