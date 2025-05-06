import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import { app } from '../app.js';
import request from 'supertest';

const KEY = 'hackateen_key';

export const authRoute = express.Router();

export async function setTokenForTest(user) {
    const loginResponse = await request(app)
        .post('/login')
        .send({
            email: user.email,
            password: user.password,
        });

    const token = loginResponse.body.token;
    console.log('Token gerado:', token);

    return token;
}

authRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return res.status(401).send({
            erro: { mensagem: 'Credenciais inválidas' },
        });
    }

    const token = jwt.sign({ userId: user.userId, email: user.email }, KEY, { expiresIn: '1h' });
    res.send({ token });
});