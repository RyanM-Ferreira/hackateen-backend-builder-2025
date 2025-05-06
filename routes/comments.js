import express from 'express';
import { createComment, readComments, readCommentsPerId, updateCommentsPerId, deleteCommentsPerId } from './../models/comments.js';
import { authMiddleware } from './../middleware/authMiddleware.js';

export const commentsRoute = express.Router();

commentsRoute.post('/comments', authMiddleware, async (req, res) => {
    const comment = req.body;

    res.statusCode = 400;
    try {
        if (!comment.content && !comment.date && !user.id && !post.id) {
            const response = {
                erro: {
                    mensagem: `Todos os campos obrigatorios devem ser preenchidos `,
                },
            };
            return res.send(response);
        }
        if (!comment?.content) {
            const response = {
                erro: {
                    mensagem: `O atributo 'conteúdo' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }

        if (!comment?.date) {
            const response = {
                erro: {
                    mensagem: `O atributo 'data' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }

        if (!comment?.postId) {
            const response = {
                erro: {
                    mensagem: `O atributo 'postId' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }

        if (!comment?.userId) {
            const response = {
                erro: {
                    mensagem: `O atributo 'userId' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }


        const response = await createComment(comment);
        res.statusCode = 201;

        return res.send(response);

    } catch (error) {
        if (error) {
            console.error('Erro ao criar o comentário:', error);

            res.statusCode = 400;
            const response = {
                erro: {
                    mensagem: `Erro ao criar o comentário ${comment.commentId}`
                }
            };
            return res.send(response);
        }
    }
});

commentsRoute.patch('/comments/:id', authMiddleware, async (req, res) => {

    const comment = req.body;

    res.statusCode = 400;


    if (!comment?.content && !comment.date) {
        const response = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porem ao menos um é obrigatório para atualização`,
            },
        };

        return res.send(response);
    }

    const id = req.params.id;
    try {
        const response = await updateCommentsPerId(id, comment);
        res.statusCode = 200;

        return res.send(response);

    } catch (error) {
        console.error('Erro ao Atualizar o comentário:', error);

        res.statusCode = 500;
        const response = {
            erro: {
                mensagem: `Erro ao atualizar o comentário ${id}`
            }
        };
        return res.send(response);
    };
});

commentsRoute.delete('/comments/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;

    try {
        await deleteCommentsPerId(id);

        res.statusCode = 202;

        const response = {
            response: {
                mensagem: `Comentário ${id} removido com sucesso!`,
            }
        };
        return res.send(response);

    } catch (error) {

        res.statusCode = 500;
        const response = {
            erro: {
                mensagem: `Erro ao remover o Comentário ${id}, ${error}`
            }
        };
        return res.send(response);

    }
});

commentsRoute.get('/comments/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await readCommentsPerId(id);

        res.statusCode = 200;

        return res.send(response);
    } catch (error) {
        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar o comentário ${id}, ${error}`
            }
        };
        return res.send(response);
    }
});

commentsRoute.get('/comments', async (req, res) => {
    try {
        const response = await readComments();
        res.statusCode = 200;

        return res.send(response);
    } catch (error) {

        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar os comentários`
            }
        };
        return res.send(response);
    }
});

