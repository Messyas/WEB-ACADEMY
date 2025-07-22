import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: "api do marketplace",
    description: "documentação",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    CreateProductDto: {
      name: "Teclado mecanico",
      price: 2988.0,
      stockQuantity: 108,
    },
    Product: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      name: "teclado mecanico rgb",
      price: 200.0,
      stockQuantity: 1,
      createdAt: "2024-11-07T19:27:15.645Z",
      updatedAt: "2026-11-07T19:27:15.645Z",
    },
    Products: [
      {
        id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
        name: "mouse gamer",
        price: 131.9,
        stockQuantity: 1,
        createdAt: "2024-11-07T19:27:15.645Z",
        updatedAt: "2026-11-07T19:27:15.645Z",
      },
      {
        id: "e7d9ab18-f4fb-4c7f-9f87-80d914e5cec5",
        name: "ferro",
        price: 330.87,
        stockQuantity: 100,
        createdAt: "2021-11-07T19:23:30.645Z",
        updatedAt: "2022-11-07T19:27:15.645Z",
      },
    ],
    CreateUserDto: {
      name: "goku black",
      email: "gokublack@gmail.com",
      password: "123samazu",
      userTypeId: "e3fd4fcd-3cd7-45ef-b49d-9237203e8924",
    },
    User: {
      id: "d1c61bd3-ddb7-4ac6-bb06-d2dde417f560",
      name: "hoho",
      email: "hoho@gmail.com",
      password: "hoho123",
      userTypeId: "d90171c9-a589-4883-a0bb-027a32e0be23",
    },
    Users: [
      {
        id: "d1c61bd3-ddb7-4ac6-bb06-d2dde417f560",
        name: "Messyas",
        email: "messyas@gmail.com",
        password: "messyas123",
        userTypeId: "e3fd4fcd-3cd7-45ef-b49d-9237203e8924",
      },
      {
        id: "0dd92da1-f06b-43e9-bb30-fb4064b3fefc",
        name: "acio",
        email: "acio@gmail.com",
        password: "acio123",
        userTypeId: "d90171c9-a589-4883-a0bb-027a32e0be23",
      },
    ],
    LoginDto: {
      email: "mess@gmail.com",
      password: "123coralcalvo",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];
swaggerAutogen()(outputFile, routes, doc);
