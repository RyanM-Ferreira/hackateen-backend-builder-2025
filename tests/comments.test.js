import request from 'supertest';
import { App, app } from '../app.js';
import { sequelize } from '../models/database.js';
import { setTokenForTest } from '../routes/auth.js';

let server;

beforeAll(async () => {
    server = await App();
});

afterAll(async () => {
    await server.close();
    await sequelize.close();
});

beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
});


describe('Testes para o endpoint /comments', () => {

    it('Deve criar um novo comentário com sucesso', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(201);
        expect(commentResponse.body).toHaveProperty('commentId');
        expect(commentResponse.body.content).toBe('Este é um comentário');
        expect(commentResponse.body.userId).toEqual(userResponse.body.userId);
        expect(commentResponse.body.postId).toEqual(postResponse.body.postId);
    });

    it('Deve retornar erro ao tentar criar um novo comentário sem nenhum atributo', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);



        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({

            });

        expect(commentResponse.statusCode).toBe(400);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um novo comentário sem conteudo', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                date: '2023-10-01',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(400);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um novo comentário sem data', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(400);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um novo comentário sem o id do post', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                userId: userResponse.body.userId
            });

        expect(commentResponse.statusCode).toBe(400);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um novo comentário sem o id do user', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);



        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(400);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar um comentário especificio por meio de id', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);



        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(201);
        expect(commentResponse.body).toHaveProperty('commentId');
        expect(commentResponse.body.content).toBe('Este é um comentário');
        expect(commentResponse.body.userId).toEqual(userResponse.body.userId);
        expect(commentResponse.body.postId).toEqual(postResponse.body.postId);

        const commentId = await request(app)
            .get(`/comments/${commentResponse.body.commentId}`)
            .send();

        expect(commentId.statusCode).toBe(200);
        expect(commentId.body.commentId).toEqual(commentResponse.body.commentId);
    });

    it('Deve retornar um erro ao tentar obter um comentário especificio por meio de id, porém o comentário não existe', async () => {
        const commentResponse = await request(app)
            .get('/comments/30')
            .send();

        expect(commentResponse.statusCode).toBe(404);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar todos os comentários', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(201);
        expect(commentResponse.body).toHaveProperty('commentId');
        expect(commentResponse.body.content).toBe('Este é um comentário');
        expect(commentResponse.body.userId).toEqual(userResponse.body.userId);
        expect(commentResponse.body.postId).toEqual(postResponse.body.postId);

        const comments = await request(app)
            .get(`/comments`)
            .send();

        expect(comments.statusCode).toBe(200);
        expect(comments.body).toBeInstanceOf(Array);
        expect(comments.body.length).toBeGreaterThan(0);
    });

    it('Deve retornar erro ao tentar buscar os comentários, porém não existe nenhum comentário', async () => {
        const commentResponse = await request(app)
            .get('/comments')
            .send();

        expect(commentResponse.statusCode).toBe(404);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve atualizar o comentário com sucesso', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(201);
        expect(commentResponse.body).toHaveProperty('commentId');
        expect(commentResponse.body.content).toBe('Este é um comentário');
        expect(commentResponse.body.userId).toEqual(userResponse.body.userId);
        expect(commentResponse.body.postId).toEqual(postResponse.body.postId);

        const commentpatch = await request(app)
            .patch(`/comments/` + commentResponse.body.commentId)
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é o comentário atualizado',
                date: '2023-10-02',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentpatch.statusCode).toBe(200);
        expect(commentpatch.body.content).toBe('Este é o comentário atualizado');
        expect(commentpatch.body.date).toBe('2023-10-02');
        expect(commentpatch.body.userId).toEqual(commentResponse.body.userId);
        expect(commentpatch.body.postId).toEqual(commentResponse.body.postId);
    });

    it('Deve retornar erro ao tentar atualizar um comentário, porém o não é enviado nenhum atributo', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(201);
        expect(commentResponse.body).toHaveProperty('commentId');
        expect(commentResponse.body.content).toBe('Este é um comentário');
        expect(commentResponse.body.userId).toEqual(userResponse.body.userId);
        expect(commentResponse.body.postId).toEqual(postResponse.body.postId);

        const commentpatch = await request(app)
            .patch(`/comments/` + commentResponse.body.commentId)
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(commentpatch.statusCode).toBe(400);
        expect(commentpatch.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar atualizar um comentário, porém o comentário não existe', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const commentResponse = await request(app)
            .patch('/comments/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é o comentário atualizado',
                date: '2023-10-02'
            });

        expect(commentResponse.statusCode).toBe(500);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve deletar o comentário com sucesso', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);


        const commentResponse = await request(app)
            .post('/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é um comentário',
                date: '2023-10-01',
                userId: userResponse.body.userId,
                postId: postResponse.body.postId
            });

        expect(commentResponse.statusCode).toBe(201);
        expect(commentResponse.body).toHaveProperty('commentId');
        expect(commentResponse.body.content).toBe('Este é um comentário');
        expect(commentResponse.body.userId).toEqual(userResponse.body.userId);
        expect(commentResponse.body.postId).toEqual(postResponse.body.postId);

        const commentdelete = await request(app)
            .delete(`/comments/` + commentResponse.body.commentId)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(commentdelete.statusCode).toBe(202);
        expect(commentdelete.body.response).toHaveProperty('mensagem');
        expect(commentdelete.body.response.mensagem).toBe(`Comentário ${commentResponse.body.commentId} removido com sucesso!`);
    });

    it('Deve retornar erro ao tentar deletar um comentário, porém o comentário não existe', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user);


        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);
        
        const commentResponse = await request(app)
            .delete('/comments/1')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(commentResponse.statusCode).toBe(500);
        expect(commentResponse.body.erro).toHaveProperty('mensagem');
    });
});