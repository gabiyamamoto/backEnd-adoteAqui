import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    const tiposExistentes = await prisma.tipo.findMany();

    if (tiposExistentes.length === 0) {
        const tipos = ['Cachorro', 'Gato', 'Coelho', 'Pássaro', 'Hamster'];
        for (const nome of tipos) {
            await prisma.tipo.create({ data: { nome } });
        }
        console.log("Tipos criados com sucesso!");
    }


    const tipos = await prisma.tipo.findMany();


    const tamanhos = ['Pequeno', 'Médio', 'Grande'];
    const nomes = [
        'Luna', 'Max', 'Bella', 'Charlie', 'Lucy', 'Rocky', 'Milo', 'Daisy', 'Jack', 'Lola',
        'Toby', 'Bailey', 'Coco', 'Bento', 'Nina', 'Oliver', 'Zeus', 'Maggie', 'Thor', 'Loki',
        'Simba', 'Ruby', 'Rex', 'Sasha', 'Chloe', 'Murphy', 'Ginger', 'Leo', 'Penny', 'Oscar',
        'Maya', 'Finn', 'Lilly', 'Bobby', 'Jasper', 'Snoopy', 'Duke', 'Sadie', 'Mocha', 'Apollo',
        'Koda', 'Roxy', 'Shadow', 'Pepper', 'Marley', 'Luna', 'Scout', 'Gus', 'Riley', 'Harley'
    ];

    for (let i = 0; i < 50; i++) {
        const randomTipo = tipos[Math.floor(Math.random() * tipos.length)];
        const randomNome = nomes[i % nomes.length]; 
        const randomIdade = Math.floor(Math.random() * 15) + 1;
        const randomTamanho = tamanhos[Math.floor(Math.random() * tamanhos.length)];

        await prisma.pet.create({
            data: {
                nome: randomNome,
                idade: randomIdade,
                tamanho: randomTamanho,
                descricao: `Descrição do pet ${randomNome}`, 
                imagemUrl: `https://placekitten.com/200/200?image=${i}`,
                adotado: false,
                tipoId: randomTipo.id,
            },
        });
    }

    console.log("50 pets criados com sucesso!");
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
