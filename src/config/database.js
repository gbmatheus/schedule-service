module.exports =  {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_URL || 'localhost',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'senha123',
  database: process.env.DB_NAME ||'schedule_service',
  port: process.env.DB_PORT || 15432,
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false
}