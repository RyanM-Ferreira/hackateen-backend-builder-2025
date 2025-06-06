import Sequelize from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
});

sequelize.authenticate();

export default sequelize;