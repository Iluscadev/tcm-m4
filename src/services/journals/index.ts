import { platform } from "os"
import AppDataSource from "../../data-source"
import { DataClientPersonal } from "../../entities/dataClientPersonal.entity"
import Journal from "../../entities/journal.entity"
import { AppError } from "../../errors/AppError"
import { IJournalCreate } from "../../interfaces/data"


export const journalCreateService = async (id:string,{exercise, time, repetitions}:IJournalCreate) => {
    
    const journalRepository = AppDataSource.getRepository(Journal)

    const userRepository = AppDataSource.getRepository(DataClientPersonal);

    const user = await userRepository.findOne({ 
        where: {
            id: id
        }
     });

     if (!user) {
        throw new AppError("User not found.", 404);
      }

    const journalAlreadyExists = await journalRepository.findOne({
        where: {exercise}
    })

    if(journalAlreadyExists){
        throw new AppError("Journal Already Exists",404)
    }

    const journal = new Journal()
    journal.exercise = exercise
    journal.time = time
    journal.repetitions = repetitions
    journal.data_client_personal = [user]

    journalRepository.create(journal)
    journalRepository.save(journal)
    
    return journal
}



export const journalListService= async() => {
    const journalRepository = AppDataSource.getRepository(Journal) 

    const journalList = await journalRepository.find()
    
    return  journalList
}

export const journalUpdateService = async(id:string,{exercise, time, repetitions}:IJournalCreate) => {
    
    const journalRepository = AppDataSource.getRepository(Journal) 


    const journal = await journalRepository.findOne({ 
        where: {
            id: id
        }
     });

     if (!journal) {
        throw new AppError("Journal not found.", 404);
      }

    const journalUpdate = journalRepository.create({
        exercise,
        time,
        repetitions
    })

    await journalRepository.update(id,{exercise: exercise, time: time, repetitions: repetitions})
    
    return journalUpdate
}


export const journalListOneService = async (id: string) => {
    const journalRepository = AppDataSource.getRepository(Journal);
    const journal = await journalRepository.findOne({
      relations: { data_client_personal: true },
      where: { id: id },
    });
  
    if (!journal) {
      throw new AppError("Journal not found", 404);
    }
  
    return journal;
}

export const journalDeleteService = async (id: string) => {
    const journalRepository = AppDataSource.getRepository(Journal)
    const journal = await journalRepository.findOneBy({id})

    if(!journal){
        throw new AppError("Journal not found", 404)
    }

    if(!journal.status){
        throw new AppError("Inactive journal")
    }

    journal.status = false

    await journalRepository.save(journal)
}