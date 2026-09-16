import "dotenv/config";
import express from "express";

import authRoutes from "./middleware/auth.js";
import requireAuth from "./middleware/requireAuth.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.js";

import { initDatabase, closeDatabase } from "./config/database.js";
import { getDataSource, isOracle } from "./config/dataSource.js";
import produtosRoutes from "./routes/produtos.js";
import clientesRoutes from "./routes/clientes.js";
import fornecedoresRoutes from "./routes/fornecedores.js";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

app.get("/swagger.json", (_req, res) => {
  res.json(swaggerDocument);
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get("/health", async (_req, res) => {
  res.json({
    status: "ok",
    servico: "tudopassa-winthor",
    data_source: getDataSource(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/produtos", requireAuth, produtosRoutes);
app.use("/api/clientes", requireAuth, clientesRoutes);
app.use("/api/fornecedores", requireAuth, fornecedoresRoutes);

app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
    rota: req.originalUrl,
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    erro: "Erro interno na API",
    mensagem: process.env.NODE_ENV === "development"
      ? error.message
      : undefined,
  });
});

let server;

async function start() {
  if (isOracle()) await initDatabase();
  else console.log("Data source: mock (Oracle não é necessário)");

  server = app.listen(port, () => {
    console.log(`TudoPassa Winthor API: http://localhost:${port}`);
  });
}

async function shutdown(signal) {
  console.log(`${signal}: encerrando aplicação...`);

  if (server) {
    server.close();
  }

  if (isOracle()) await closeDatabase();
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start().catch((error) => {
  console.error("Falha ao iniciar aplicação:", error);
  process.exit(1);
});
