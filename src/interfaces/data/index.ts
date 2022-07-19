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
}

export interface IDataResponse {
    id: string
    name: string
    email: string
    age: string 
    plan: string
    status: boolean
    lock_number: number
}

export interface IJournal{
    id: string
    exercise: string
    time: string
    repetitions: number
}

export interface IJournalCreate{
    exercise: string
    time: string
    repetitions: number
}