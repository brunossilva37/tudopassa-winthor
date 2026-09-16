import oracledb from "oracledb";

let pool;

function numberFromEnv(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
}

export async function initDatabase() {
  if (pool) return pool;

  pool = await oracledb.createPool({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING,
    poolMin: numberFromEnv("ORACLE_POOL_MIN", 1),
    poolMax: numberFromEnv("ORACLE_POOL_MAX", 5),
    poolIncrement: numberFromEnv("ORACLE_POOL_INCREMENT", 1),
  });

  console.log("Oracle: pool inicializado");
  return pool;
}

export async function getConnection() {
  if (!pool) {
    await initDatabase();
  }

  return pool.getConnection();
}

export async function closeDatabase() {
  if (pool) {
    await pool.close(10);
    pool = undefined;
    console.log("Oracle: pool encerrado");
  }
}
