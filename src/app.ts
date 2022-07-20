import "reflect-metadata"
import "express-async-errors"
import express from "express"

import clientsPersonalRoutes from "./routes/dataClientPersonal.routes"
import avaliationRoutes from "./routes/avaliation.routes"
import journalRoutes from "./routes/journal.routes"
import addressRoutes from "./routes/address.routes"
import loginRoutes from "./routes/login.routes"
import handleAppErrorMiddleware from "./middlewares/handleAppErrors.middleware"

const app = express()

app.use(express.json())

app.use("/user", clientsPersonalRoutes)
app.use("/avaliation", avaliationRoutes)
app.use("/journal", journalRoutes)
app.use("/address", addressRoutes)
app.use("/login", loginRoutes)

app.use(handleAppErrorMiddleware)

app.listen(3000, () =>{
    console.log("Server running..")
})

export default app