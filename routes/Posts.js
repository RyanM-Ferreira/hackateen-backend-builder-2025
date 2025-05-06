import { authMiddleware } from './../middleware/authMiddleware.js';

import express from 'express';
import { createPost, readPosts, readPostsPerId, updatePostPerId, deletePostPerId } from './../models/posts.js';


export const postsRoute = express.Router();



postsRoute.post('/posts', authMiddleware, async (req, res) => {
    const posts = req.body;

    res.statusCode = 400;
    try {
        if (!posts.title && !posts.type && !posts.content && !posts.userId) {
            const response = {
                erro: {
                    mensagem: `Todos os campos obrigatorios devem ser preenchidos `,
                },
            };
            throw response;
        }

        if (!posts?.title) {
            const response = {
                erro: {
                    mensagem: `O atributo 'título' não foi encontrado, porém é obrigatório`,
                },
            };

            throw response;;
        }

        if (!posts?.type) {
            const response = {
                erro: {
                    mensagem: `O atributo 'tipo' não foi encontrado ou não foi escrito corretamente, porém é obrigatório, a forma correta é 'event', 'request' ou 'alert'`,
                },
            };

            throw response;;
        }

        if (!posts?.content) {
            const response = {
                erro: {
                    mensagem: `O atributo 'conteúdo' não foi encontrado, porém é obrigatório`,
                },
            };

            throw response;
        }


        const response = await createPost(posts);
        res.statusCode = 201;

        return res.send(response);

    } catch (error) {
        if (error) {
            console.error('Erro ao criar o posts:', error);

            res.statusCode = 500;
            const response = {
                erro: {
                    mensagem: `Erro ao criar o posts ${posts.title}`
                }
            };
            return res.send(response);

        }
    }
});

postsRoute.patch('/posts/:id', authMiddleware, async (req, res) => {

    const posts = req.body;

    res.statusCode = 400;

    if (!posts?.title && !posts.type && !posts.content) {
        const response = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porém ao menos um é obrigatório para atualização`,
            },
        };

        return res.send(response);

    }

    const id = req.params.id;
    try {
        const response = await updatePostPerId(id, posts);
        res.statusCode = 200;

        return res.send(response);


    } catch (error) {
        console.error('Erro ao Atualizar o post:', error);

        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao atualizar o post ${id}`
            }
        };
        return res.send(response);

    };
});

postsRoute.delete('/posts/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;

    try {
        await deletePostPerId(id);

        res.statusCode = 202;

        const response = {
            response: {
                mensagem: `Post ${id} removido com sucesso!`,
            }
        };

        return res.send(response);

    } catch (error) {

        res.statusCode = 500;
        const response = {
            erro: {
                mensagem: `Erro ao remover o post ${id}, ${error}`
            }
        };
        return res.send(response);

    }
});

postsRoute.get('/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await readPostsPerId(id);

        res.statusCode = 200;

        return res.send(response);
    } catch (error) {
        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar o post ${id}, ${error}`
            }
        };
        return res.send(response);

    }
});

postsRoute.get('/posts', async (req, res) => {
    try {
        const response = await readPosts();
        res.statusCode = 200;

        return res.send(response);

    } catch (error) {
        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar os posts`
            }
        };
        return res.send(response);
    }
});