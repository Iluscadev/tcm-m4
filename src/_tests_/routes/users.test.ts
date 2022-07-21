import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest"
import { IDataRequest } from "../../interfaces/data";

const testUser: IDataRequest = {
  name: "Nami",
  email: "Nami@gmail.com",
  age: "26",
  phone_number: "9819839189",
  plan: "Familia",
  checkin: "3 horas",
  checkout: "2 horas",
  lock_number: 2,
  password: "Navegadora",
  adm: false
}


describe("Teste para metodo POST em /user", () => {
    let connection: DataSource;
    /*let testUser = {
      name: "Nami",
      email: "Nami@gmail.com",
      age: "26",
      phone_number: "9819839189",
      plan: "Familia",
      checkin: "3 horas",
      checkout: "2 horas",
      lock_number: 2,
      password: "Navegadora",
      adm: false
    };*/
  
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
  
    /*test("Tentando criar um usuário com um email ja existente", async () => {
      const response = await request(app).post("/user/register").send(testUser);
  
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("message");
    });*/
  
  });