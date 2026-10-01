import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import v1Routes from "./api/v1/index";
import { errorHandler, notFound } from "./shared/middlewares/errorHandler";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Biblioteca API",
      version: "1.0.0",
      description: "API REST sobre una biblioteca",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/**/*.ts"],
});

export const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/v1", v1Routes);

// Manejo de rutas no encontradas y errores (siempre al final)
app.use(notFound);
app.use(errorHandler);
