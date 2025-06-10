import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

import express from 'express';
import bodyParser from 'body-parser';

import { commentsRoute } from './routes/comments.js';
import { usersRoute } from './routes/users.js';
import { postsRoute } from './routes/post.js';
import { authRoute } from './routes/auth.js';

import { sequelize } from './models/database.js';

export const app = express();

app.use(bodyParser.json());

app.use(commentsRoute);
app.use(usersRoute);
app.use(postsRoute);
app.use(authRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'siginup.html'));
});


import { swaggerSpec, swaggerUi } from './swagger.js';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export async function App() {
    await sequelize.sync();

    const server = app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);

        console.log(`Documentação visual e interativa das rotas e requisições disponível em http://localhost:3000/api-docs`);
    });
    return server;
}

App();