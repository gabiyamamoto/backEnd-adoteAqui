import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const encontreTodos = async (filtros) => {
    const query = {};

    if (filtros.especie) {
        query.especie = filtros.especie;
    }

    const tipos = await prisma.tipos.findMany({
        where: query
    });

    return tipos;
};

export const encontreUm = async (id) => {
    const tipo = await prisma.tipos.findUnique({
        where: { id: id }
    });

    return tipo;
}

export const criar = async (dado) => {
    const novoTipo = await prisma.tipos.create({
        data: {
            nome_tipo: dado.nome_tipo,
            especie: dado.especie,
            imageUrl: dado.imageUrl
        }
    });

    return novoTipo
}

export const deletar = async (id) => {
    await prisma.tipos.delete({
        where: { id: id }
    });
}

export const atualizar = async (id, dado) => {
    const tipoAtualizado = await prisma.tipos.update({
        where: { id: id },
        data: dado
    });

    return tipoAtualizado
}