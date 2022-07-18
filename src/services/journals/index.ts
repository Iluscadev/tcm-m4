import AppDataSource from "../../data-source"
import Journal from "../../entities/journal.entity"
import { IJournalCreate } from "../../interfaces/journal"


export const journalCreateService = async ({exercise, time, repetitions}:IJournalCreate) => {
    const journalRepository = AppDataSource.getRepository(Journal)

    const journalAlreadyExists = await journalRepository.findOne({
        where: {exercise}
    })

    if(journalAlreadyExists){
        throw new Error("Journal Already Exists")
    }

    const journal = new Journal()
    journal.exercise = exercise
    journal.time = time
    journal.repetitions = repetitions

    journalRepository.create(journal)
    journalRepository.save(journal)

    return journal
}



export const journalListService= async() => {
    const journalRepository = AppDataSource.getRepository(Journal) 

    const journalList = await journalRepository.find()
    
    return  journalList
}

