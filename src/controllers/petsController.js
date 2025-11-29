import * as PetsModel from './../models/petsModel.js';
import * as TiposModel from './../models/tiposModel.js';

const idadesPermitidas = ['filhote', 'adulto', 'idoso'];
const tamanhosPermitidos = ['pequeno', 'médio', 'grande'];
const generosPermitidos = ['macho', 'fêmea'];

export const listarTodos = async (req, res) => {
    try {
        const filtros = {};

        if (req.query.especie) filtros.especie = req.query.especie;
        if (req.query.idade) filtros.idade = req.query.idade;
        if (req.query.tamanho) filtros.tamanho = req.query.tamanho;
        if (req.query.genero) filtros.genero = req.query.genero;
        if (req.query.adotado) filtros.adotado = req.query.adotado;

        const pets = await PetsModel.encontreTodos(filtros);

        if (!pets || pets.length === 0) {
            return res.status(404).json({
                total: 0,
                mensagem: 'Não há pets cadastrados com os filtros aplicados',
                filtros
            });
        }

        res.status(200).json({
            total: pets.length,
            mensagem: 'Lista de pets disponíveis',
            filtros,
            pets
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao listar pets',
            detalhes: error.message
        });
    }
};

export const listarUm = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'ID deve ser um número válido'
            });
        }

        const pet = await PetsModel.encontreUm(id);

        if (!pet) {
            return res.status(404).json({
                erro: 'Pet não encontrado',
                id: id
            });
        }

        res.status(200).json({
            mensagem: 'Pet encontrado',
            pet
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar pet',
            detalhes: error.message
        });
    }
};

export const criar = async (req, res) => {
    try {
        const dado = req.body;

        const camposObrigatorios = ['nome', 'tipoId', 'idade', 'tamanho', 'genero', 'local'];
        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Campos obrigatórios faltando: ${faltando.join(', ')}`
            });
        }

        if (!idadesPermitidas.includes(dado.idade)) {
            return res.status(400).json({
                erro: `A idade deve ser uma das opções: ${idadesPermitidas.join(', ')}`
            });
        }

        if (!tamanhosPermitidos.includes(dado.tamanho)) {
            return res.status(400).json({
                erro: `O tamanho deve ser uma das opções: ${tamanhosPermitidos.join(', ')}`
            });
        }

        if (!generosPermitidos.includes(dado.genero)) {
            return res.status(400).json({
                erro: `O gênero deve ser uma das opções: ${generosPermitidos.join(', ')}`
            });
        }

        const tipoExiste = await TiposModel.encontreUm(dado.tipoId);
        if (!tipoExiste) {
            return res.status(400).json({
                erro: 'Tipo não encontrado. Verifique se o tipoId existe.'
            });
        }

        const novoPet = await PetsModel.criar(dado);

        res.status(201).json({
            mensagem: 'Pet criado com sucesso!',
            pet: novoPet
        });

    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({
                erro: 'Tipo não encontrado. Verifique se o tipoid existe.'
            });
        }

        res.status(500).json({
            erro: 'Erro ao criar pet',
            detalhes: error.message
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'ID deve ser um número válido'
            });
        }

        const pet = await PetsModel.encontreUm(id);

        if (!pet) {
            return res.status(404).json({
                erro: 'Pet não encontrado para deletar',
                id: id
            });
        }

        await PetsModel.deletar(id);

        res.status(200).json({
            mensagem: 'Pet deletado com sucesso',
            petRemovido: pet
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao deletar pet',
            detalhes: error.message
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dado = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'ID deve ser um número válido'
            });
        }

        if (dado.idade && !idadesPermitidas.includes(dado.idade))
            return res.status(400).json({
                erro: `Idade deve ser uma das opções: ${idadesPermitidas.join(', ')}`
            });

        if (dado.tamanho && !tamanhosPermitidos.includes(dado.tamanho))
            return res.status(400).json({
                erro: `Tamanho deve ser uma das opções: ${tamanhosPermitidos.join(', ')}`
            });

        if (dado.genero && !generosPermitidos.includes(dado.genero))
            return res.status(400).json({
                erro: `Gênero deve ser uma das opções: ${generosPermitidos.join(', ')}`
            });

        const petExiste = await PetsModel.encontreUm(id);

        if (!petExiste) {
            return res.status(404).json({
                erro: 'Pet não encontrado para atualizar',
                id: id
            });
        }

        const petAtualizado = await PetsModel.atualizar(id, dado);

        res.status(200).json({
            mensagem: 'Pet atualizado com sucesso',
            petAtualizado
        });

    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({
                erro: 'Tipo não encontrado. Verifique se o tipoid existe.'
            });
        }

        res.status(500).json({
            erro: 'Erro ao atualizar pet',
            detalhes: error.message
        });
    }
};

export const buscar = async (req,res) => {
    try {
        const {termo} = req.query;

        if (!termo || termo.trim() === '') {
            return res.status(400).json({
                erro: 'Termo de busca é obrigatório'
            });
        }

        const pets = await PetsModel.buscarPorIdOuNome(termo.trim());

        if (!pets || pets.length === 0) {
            return res.status(404).json({
                total: 0,
                mensagem: 'Nenhum pet encontrado com o termo buscado. Verifique se o ID ou o nome estão corretos',
                termo: termo
            });
        }

        res.status(200).json({
            total: pets.length,
            mensagem: pets.length === 1 ? 'Pet encontrado!' : 'Pets encontrados!',
            termo: termo,
            pets
        });

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar pets',
            detalhes: error.message
        });
    }
};