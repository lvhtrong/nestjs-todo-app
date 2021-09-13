import { Connection, createConnection, getManager } from 'typeorm';

/**
 * MAIN
 */

let connection: Connection = null;

const createDatabaseIfNotExist = async (databaseName: string) => {
  // Establish the connection
  connection = await createConnection({
    type: process.env.DB_TYPE as any,
    url: process.env.DB_URI,
    ssl:
      process.env.DB_SSLMODE === 'require'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  });

  // Get all existed databases
  const entityManager = getManager();
  const databasesQueryResult: any[] = await entityManager.query(
    `SELECT 0 FROM pg_database WHERE datname = '${databaseName}';`,
  );
  if (databasesQueryResult.length > 0) {
    console.info(`Database ${databaseName} is existed!`);
  } else {
    console.info(
      `Database ${databaseName} is not exist. Creating database ...`,
    );
    await entityManager.query(`CREATE DATABASE "${databaseName}";`);
    console.log(`Database ${databaseName} is created!`);
  }
};

export async function initDatabase(): Promise<void> {
  // Constants
  const databaseNeedToCreate = process.env.DB_NAME;
  await createDatabaseIfNotExist(databaseNeedToCreate).then(() =>
    connection.close(),
  );

  // TODO: run migration
}
