import { DataSource } from "typeorm";
import { DataClientPersonal } from "./entities/dataClientPersonal.entities";

require("dotenv").config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,

    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    synchronize: false,
    logging: true,

    entities: [DataClientPersonal],

    migrations: ["src/migrations/*.ts"]

});

AppDataSource.initialize().then(() => {console.log("Data Source Initialized")}).catch((error) => {
    console.log("Error during Data Source Initialization", error)
})