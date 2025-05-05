import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';

const KEY = 'hackateen_key';

export const authRoute = express.Router();

authRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return res.status(401).send({
            erro:
                { mensagem: 'Credenciais inválidas' }
        });
    }
    const token = jwt.sign({ userId: user.userId, email: user.email }, KEY, { expiresIn: '1h' });
    console.log('Token gerado no login:', token); 
    res.send({ token });
});