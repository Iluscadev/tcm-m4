import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest"


describe("Teste para metodo POST em /user", () => {
    let connection: DataSource;
    let testUser = {
        name: "Monkey D. Luffy",
        email: "luffy@email.com",
        age: "22",
        password: "ReidosPiratas",
        phone_number: "912891821",
        adm: true,
        plan: "Sem Plano",
        checkin: "3 Horas",
        checkout: "5 horas",
        lock_number: 2
    };

    let testJournal = {
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
  
    test("Tentando criar um usuário", async () => {
      const response = await request(app).post("/user/register").send(testUser);
  
      expect(response.status).toEqual(201);
      expect(response.body.id.length).toEqual(36);
      expect(response.body).not.toHaveProperty("password");
      expect(response.body).toEqual(
        expect.objectContaining({
          id: response.body.id,
          name: testUser.name,
          email: testUser.email,
          age: testUser.age,
          plan: testUser.plan,
          status: true
        })
      );
    });
  
    test("Tentando criar um usuário com um email ja existente", async () => {
      const response = await request(app).post("/users").send(testUser);
  
      expect(response.status).toEqual(404);
    
    });
  
  });