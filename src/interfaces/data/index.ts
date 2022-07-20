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
    status: boolean
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

export interface IAvaliationCreate{
    wheight: number
    height: number
    neck: string
    waist: number
    bust: number
    hip: number
    arm_right: number
    arm_left: number
    leg_right: number
    leg_left: number
    cardio_freq: number
    circumference: number
    diameter: number
}

export interface IAvaliation extends IAvaliationCreate{
    id: string
    created_at: Date
    updated_at: Date
}

export interface ICreateAddress {
    street: string
    number: string
    cep: string
    complement: string
    town: string
    state: string
}