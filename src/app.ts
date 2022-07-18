import "reflect-metadata"
import express from "express"

import clientsPersonalRoutes from "./routes/dataClientPersonal.routes"
import avaliationRoutes from "./routes/avaliation.routes"
import journalRoutes from "./routes/journal.routes"
import addressRoutes from "./routes/address.routes"

const app = express()

app.use(express.json())

app.use(clientsPersonalRoutes)
app.use(avaliationRoutes)
app.use(journalRoutes)
app.use(addressRoutes)


export default app