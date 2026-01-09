import mysql from "mysql2/promise";

const socketPath = process.env.DB_SOCKET;
const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307;
const shouldUseSSL =
    (process.env.DB_SSL || "").toLowerCase() === "true" ||
    /rlwy\.net|railway/i.test(host);

const poolConfig = socketPath
    ? { socketPath }
    : {
        host,
        port,
    };

export const pool = mysql.createPool({
    ...poolConfig,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "KMS",
    ssl: shouldUseSSL ? { rejectUnauthorized: false } : undefined,
    connectTimeout: 15000,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
