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