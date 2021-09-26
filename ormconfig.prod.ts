module.exports = {
  type: process.env.DB_TYPE as any,
  url: `${process.env.DB_URI}/${process.env.DB_NAME}`,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'dist/migrations',
  },
};
