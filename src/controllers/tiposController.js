import { PrismaClient } from "@prisma/client";
import * as TiposModel from './../models/tiposModel.js'

const prisma = new PrismaClient();

//Listar todos
export const listarTodos = async (req, res) => {
    try {
        const filtros = {};

        if (req.query.especie) filtros.especie = req.query.especie;

        const tipos = await TiposModel.encontreTodos(filtros);

        if (!tipos || tipos.length === 0) {
            return res.status(404).json({
                total: 0,
                mensagem: 'Não há tipos cadastrados dessa espécie!', filtros
            });
        }

        res.status(200).json({
            total: tipos.length,
            mensagem: 'Lista de tipos de pets disponíveis', filtros,
            tipos
        });
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao listar tipos',
            detalhes: error.message
        });
    }

}

//Listar tipo por ID
export const listarUm = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'O ID deve ser um número válido!'
            });
        }

        const tipo = await TiposModel.encontreUm(id);

        if (!tipo) {
            return res.status(404).json({
                erro: 'Tipo não encontrado!',
                id: id
            });
        }

        res.status(200).json({
            mensagem: 'Tipo encontrado por ID',
            tipo
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar tipo por ID',
            detalhes: error.message
        });
    }
}


export const criar = async (req, res) => {
    try {
        const dado = req.body;

        const camposObrigatorios = ['nome_tipo', 'especie', 'imageUrl'];
        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Campos obrigatórios faltando: ${faltando.join(', ')}`
            });
        }

        const especiesPermitidas = ['cachorro', 'gato', 'coelho', 'pássaro', 'hamster'];

        if (!especiesPermitidas.includes(dado.especie.toLowerCase())) {
            return res.status(400).json({
                erro: `Espécie deve ser uma das opções: ${especiesPermitidas.join(', ')}`
            });
        }

        const novoTipo = await TiposModel.criar(dado);

        res.status(201).json({
            mensagem: 'Tipo criado com sucesso!',
            tipo: novoTipo
        });

    } catch (error) {

        if (error.message === 'Já existe um tipo com esse nome e espécie.') {
            return res.status(400).json({
                erro: error.message
            });
        }

        res.status(500).json({
            erro: 'Erro ao criar novo tipo de pet',
            detalhes: error.message
        });
    }
    }


export const deletar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'O ID deve ser um número válido'
            });
        }

        const tipo = await TiposModel.encontreUm(id);

        if (!tipo) {
            return res.status(404).json({
                erro: 'Tipo não encontrado para deletar',
                id: id
            });
        }

        await TiposModel.deletar(id);

        res.status(200).json({
            mensagem: 'Tipo deletado com sucesso',
            tipoRemovido: tipo
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao deletar tipo',
            detalhes: error.message
        });
    }
}

export const atualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dado = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'O ID deve ser um número válido!'
            });
        }

        const tipoExiste = await TiposModel.encontreUm(id);

        if (!tipoExiste) {
            return res.status(404).json({
                erro: 'Tipo não encontrado para atualizar',
                id: id
            });
        }

        const tipoAtualizado = await TiposModel.atualizar(id, dado);

        res.status(200).json({
            mensagem: 'Tipo atualizado com sucesso',
            tipoAtualizado
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar tipo!',
            detalhes: error.message
        })
    }
}