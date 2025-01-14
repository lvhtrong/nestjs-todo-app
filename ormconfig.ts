module.exports = {
  type: process.env.DB_TYPE as any,
  url: `${process.env.DB_URI}/${process.env.DB_NAME}`,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  entities: [__dirname + 'src/**/entities/*.entity{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};
