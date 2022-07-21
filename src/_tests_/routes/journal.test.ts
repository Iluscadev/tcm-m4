import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest"

describe("Teste para metodo POST em /journal", () => {
    let connection: DataSource;
    let testUser = {
        exercise: "Esteira",
        time: "10 min - Cardio - Leve",
        repetitions: 1
    };
  
    beforeAll(async () => {
      await AppDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
        });
    });
  
    afterAll(async () => {
      await connection.destroy();
    });
  
    /*test("Tentando criar um Jounal", async () => {
      const response = await request(app).post("/user/register").send(testUser);
  
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("id")
      expect(response.body.id.length).toEqual(36);
    
      
    });*/
  
    test("Tentando criar um journal para um usuario não existente", async () => {
      const response = await request(app).post("/users").send(testUser);
  
      expect(response.status).toEqual(404);
    
    });
  
  });