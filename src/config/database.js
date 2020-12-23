module.exports =  {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'senha123',
  database: 'schedule_service',
  port: 15432,
  define: {
    timestamps: true,
    underscored: true,
  }
}