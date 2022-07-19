export interface IData{
    id: string
    name: string
    age: number
    password: string
    status: boolean
    admin: boolean
    created_At: Date
    updated_At: Date
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface IDataRequest {
    name: string
    email: string
    age: string
    password: string
    phone_number: string
    adm: boolean 
    plan: string
    checkin: string
    checkout: string
    lock_number: number
    street: string
    number: string
    cep: string
    town: string
    state: string

}

export interface IDataResponse {
    id: string
    name: string
    email: string
    age: string 
    status: boolean
    street: string
    number: string
    town: string
    state: string
}