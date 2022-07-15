import * as express from "express"

declare global {
    namespace Express {
        interface Request {
            data: {
                id: string
                adm: boolean
            }
        }
    }
}