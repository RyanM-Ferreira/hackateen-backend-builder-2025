import { sequelize } from './database.js';
import Sequelize from 'sequelize';

export const User = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'O campo "email" deve conter um endereço de email válido.'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export async function createUser(user) {
    try {
        const result = await User.create(user);
        console.log(`User ${result.name} foi criado com sucesso!`);
        return result;
    } catch (error) {
        console.error('Erro ao criar o User:', error);
        throw error;
    }
};

export async function readUser() {
    try {
        const result = await User.findAll();
        if (result.length === 0) {
            throw "Nenhum User encontrado!";
        }
        console.log(`Users consultados com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar os Users:', error);
        throw error;
    }
};

export async function readUserPerId(id) {
    try {
        const result = await User.findByPk(id);
        if (result === null) {
            throw "User não encontrado!";
        }
        console.log(`User consultado com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar o User:', error);
        throw error;
    }
};

export async function updateUserPerId(id, dadosUser) {
    try {
        const result = await User.findByPk(id);
        if (result === null) {
            throw "User não encontrado!";
        }
        if (result) {
            for (const key in dadosUser) {
                if (Object.hasOwn(result.dataValues, key)) {
                    result[key] = dadosUser[key];
                }
            }
            await result.save();
            console.log(`User atualizado com sucesso!`, result);
        }

        return result;
    } catch (error) {
        console.error('Erro ao atualizar o User:', error);
        throw error;
    }
};

export async function deleteUserPerId(id) {
    try {
        const result = await User.destroy({ where: { userId: id } });
        if (result === 0) {
            throw "User não encontrado!";
        }
        return result;
    } catch (error) {
        console.error('Erro ao deletar o user:', error);
        throw error;
    }
};
