import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Função que busca todos os pets
//Cumpre a RF01, RF03, e RN10
export const encontreTodos = async (filtros = {}) => {
    const where = {};

    //Filtros por especie (tabela tipos), idade, tamanho, genero e status
    if (filtros.especie) {
        where.tipo = {
            especie: {
                equals: filtros.especie,
                mode: 'insensitive' //Permite buscar sem diferenciar maiusculas de minusculas
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
        orderBy: { id: 'asc' }, //Garante ordenação fixa para o catalogo
        include: { tipo: true } //Retorna tambem o tipo associado
    });
};

//Busca pet pelo ID com include
export const encontreUm = async (id) => {
    return await prisma.pets.findUnique({
        where: { id: Number(id) },
        include: { tipo: true }
    });
};

//Cria um pet respeitando os campos obrigatórios e booleanos opcionais
export const criar = async (dado) => {
    return await prisma.pets.create({
        data: {
            nome: dado.nome,
            tipoId: Number(dado.tipoId),
            idade: dado.idade,
            tamanho: dado.tamanho,
            genero: dado.genero,
            local: dado.local,
            adotado: dado.adotado ?? false, //Se não for enviado, preenche como false
            vacinado: dado.vacinado ?? false,
            castrado: dado.castrado ?? false,
            descricao: dado.descricao
        }
    });
};

//Exclui um pet por ID
export const deletar = async (id) => {
    return await prisma.pets.delete({
        where: { id: Number(id) }
    });
};

//Atualiza apenas os campos enviados no body
export const atualizar = async (id, dado) => {
    return await prisma.pets.update({
        where: { id: Number(id) },
        data: {
            ...(dado.nome && { nome: dado.nome }),
            ...(dado.tipoId && { tipoId: Number(dado.tipoId) }),
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

//Busca por ID ou por nome
export const buscarPorIdOuNome = async (termo) => {
    const id = Number(termo);

    //Se o termo for numero, puxa a funcao de buscar por ID
    if (!isNaN(id)) {
        const petPorId = await encontreUm(id);
        return petPorId ? [petPorId] : [];
    } else { //Se for texto, busca por nome sem diferenciar maiusculas/minusculas
        return await prisma.pets.findMany({
            where: {
                nome: {
                    contains: termo,
                    mode: 'insensitive'
                }
            },
            include: { tipo: true },
            orderBy: { id: 'asc' }
        });
    }
};