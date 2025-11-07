import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando o seed...")

    // Limpar na ordem correta (por causa do relacionamento)
    await prisma.pet.deleteMany();
    await prisma.tipo.deleteMany();

    console.log("Criando tipos....");
    const tipos = [
        { nome: "Cachorro" },
        { nome: "Gato" },
        { nome: "Coelho" },
        { nome: "Passaro" },
        { nome: "Hamster" },

    ];

    //Criar tipos primeiro 
    await prisma.tipo.createMany({
        data: tipos,
        skipDuplicates: true
    });

    // Buscar os tipos criados
    const tiposCadastrados = await prisma.tipo.findMany();
    console.log(`${tiposCadastrados.length} tipos criados`);

    // Criar pets
    const pets = [];
    for (let i = 1; i <= 100; i++) {
        const tipoAleatorio =
            tiposCadastrados[Math.floor(Math.random() * tiposCadastrados.length)];

        pets.push({
            nome: `Pet ${i}`,
            idade: Math.floor(Math.random() * 15) + 1,
            tamanho: ["Pequeno", "Médio", "Grande"][Math.floor(Math.random() * 3)],
            descricao: `Um ${tipoAleatorio.nome.toLowerCase()} adorável e saudável.`,
            tipoId: tipoAleatorio.id,
            imagemUrl: `https://picsum.photos/200/200?random=${i}`,
        });
    }

    await prisma.pet.createMany({ data: pets });
    console.log("✅ 100 pets criados com sucesso!");

}

