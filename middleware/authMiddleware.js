import jwt from 'jsonwebtoken';

const KEY = 'hackateen_key';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: { mensagem: 'Token não fornecido' } });
    }
    try {
        req.user = jwt.verify(token, KEY);
        next();
    } catch {
        res.status(403).send({ error: { mensagem: 'Token inválido' } });
    }
}
