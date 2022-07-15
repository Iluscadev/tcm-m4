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