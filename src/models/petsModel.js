import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const encontreTodos = async (filtros = {}) => {
    const where = {};

    if (filtros.especie) {
        where.tipo = {
            especie: {
                equals: filtros.especie,
                mode: 'insensitive'
            }
        };
    }

    if (filtros.idade) {
        where.idade = filtros.idade;
    }

    if (filtros.tamanho) {
        where.tamanho = filtros.tamanho;
    }

    if (filtros.genero) {
        where.genero = filtros.genero;
    }

    if (filtros.adotado !== undefined) {
        where.adotado = filtros.adotado === 'true';
    }

    return await prisma.pets.findMany({
        where,
        orderBy: { id: 'asc' },
        include: { tipo: true }
    });
};

export const encontreUm = async (id) => {
    return await prisma.pets.findUnique({
        where: { id: Number(id) },
        include: { tipo: true }
    });
};

export const criar = async (dado) => {
    return await prisma.pets.create({
        data: {
            nome: dado.nome,
            tipoId: dado.tipoId,
            idade: dado.idade,
            tamanho: dado.tamanho,
            genero: dado.genero,
            local: dado.local,
            adotado: dado.adotado ?? false,
            vacinado: dado.vacinado ?? false,
            castrado: dado.castrado ?? false,
            descricao: dado.descricao
        }
    });
};

export const deletar = async (id) => {
    return await prisma.pets.delete({
        where: { id: Number(id) }
    });
};

export const atualizar = async (id, dado) => {
    return await prisma.pets.update({
        where: { id: Number(id) },
        data: {
            ...(dado.nome && { nome: dado.nome }),
            ...(dado.tipoId && { tipoId: dado.tipoId }),
            ...(dado.idade && { idade: dado.idade }),
            ...(dado.tamanho && { tamanho: dado.tamanho }),
            ...(dado.genero && { genero: dado.genero }),
            ...(dado.local && { local: dado.local }),
            ...(dado.adotado !== undefined && { adotado: dado.adotado }),
            ...(dado.vacinado !== undefined && { vacinado: dado.vacinado }),
            ...(dado.castrado !== undefined && { castrado: dado.castrado }),
            ...(dado.descricao && { descricao: dado.descricao })
        }
    });
};
