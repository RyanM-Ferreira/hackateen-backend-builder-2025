// models/database.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'dpg-d13nn1qli9vc738olbm0-a.oregon-postgres.render.com',
  port: 5432,
  database: 'komuniui_database',
  username: 'komuniui_database_user',
  password: 'cNHXtOBi5a1Gr5E0hzt4eL7LEvLvOEIA',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  logging: false
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado com sucesso ao PostgreSQL!');
  } catch (err) {
    console.error('Erro ao conectar:', err);
  }
})();

export default sequelize;