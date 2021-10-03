import { Connection, createConnection, getManager } from 'typeorm';

/**
 * MAIN
 */

const createDatabaseIfNotExist = async (databaseName: string) => {
  // Establish the connection
  const connection = await createConnection({
    type: process.env.DB_TYPE as any,
    url: process.env.DB_URI,
    ssl:
      process.env.NODE_ENV === 'production'
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

  connection.close();
};

const runMigrations = async () => {
  if (!process.env.DB_AUTO_MIGRATION_RUN) {
    console.warn(
      `skip migrations`,
    );
    return;
  }

  let connection: Connection;

  try {
    connection = await createConnection({
      name: 'migration',
      type: process.env.DB_TYPE as any,
      url: `${process.env.DB_URI}/${process.env.DB_NAME}`,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : false,
      migrations: ['dist/migrations/*.js'],
    });

    const pendingMigrations = await connection.showMigrations();
    if (pendingMigrations) {
      console.log('Migrations running!!!');

      await connection.runMigrations({
        transaction: 'none',
      });

      console.log('Migrations finished!!!');
    } else {
      console.log('No pending migrations!!!');
    }
  } catch (error) {
    console.error(error);
  } finally {
    connection.close();
  }
};

export async function initDatabase(): Promise<void> {
  // create database
  if (process.env.DB_AUTO_CREATED) {
    const databaseNeedToCreate = process.env.DB_NAME;
    await createDatabaseIfNotExist(databaseNeedToCreate);
  }

  // run migration
  await runMigrations();
}
