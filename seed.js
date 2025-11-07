import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("🚀 Iniciando o seed...");

    // Limpar na ordem correta (por causa do relacionamento)
    await prisma.pet.deleteMany();
    await prisma.tipo.deleteMany();

    console.log("📝 Criando tipos...");
    const tipos = [
        { nome: "Cachorro" },
        { nome: "Gato" },
        { nome: "Coelho" },
        { nome: "Pássaro" },
        { nome: "Hamster" },
    ];

    // Criar tipos primeiro 
    await prisma.tipo.createMany({
        data: tipos,
        skipDuplicates: true
    });

    // Buscar os tipos criados
    const tiposCadastrados = await prisma.tipo.findMany();
    console.log(`✅ ${tiposCadastrados.length} tipos criados`);

    // 🖼️ Banco de imagens realistas por tipo
    const imagensPorTipo = {
        "Cachorro": [
            "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560809459-8b6f0e5829e9?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1517423447168-cb804aafa6e0?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1534351450181-ea9c7846c932?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&h=400&fit=crop"
        ],
        "Gato": [
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1548247416-5862cce562e6?w=400&h=400&fit=crop"
        ],
        "Coelho": [
            "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1578164253957-22fafe4e7d50?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1578309851820-8d188b4ce9ce?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1585110962484-57d37d76580c?w=400&h=400&fit=crop"
        ],
        "Pássaro": [
            "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555169062-013468b47731?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1516683989964-d06b6e16fcc1?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1533560816587-1d13ec8c35a8?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1516673164556-52e315e33913?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1572402230267-f3e267c1e5a2?w=400&h=400&fit=crop"
        ],
        "Hamster": [
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1545529462-44e6f9b7c9a9?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1584555130003-bb69dad606e0?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1584555130003-2d1d6f8eec77?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1584555130003-2d1d6f8eec77?w=400&h=400&fit=crop"
        ]
    };

    // Nomes realistas para pets
    const nomesPorTipo = {
        "Cachorro": ["Rex", "Thor", "Luna", "Mel", "Bob", "Nina", "Toby", "Lola", "Max", "Bella", "Charlie", "Sophie"],
        "Gato": ["Mimi", "Oliver", "Luna", "Simba", "Chloe", "Leo", "Lily", "Milo", "Nala", "Jack", "Lucy", "Oscar"],
        "Coelho": ["Cotton", "Snowball", "Bunny", "Poppy", "Coco", "Daisy", "Marshmallow", "Thumper", "Peanut"],
        "Pássaro": ["Piu Piu", "Blue", "Sunny", "Tweety", "Rio", "Sky", "Mango", "Kiwi", "Pearl"],
        "Hamster": ["Nibbles", "Chester", "Hammy", "Gizmo", "Peanut", "Chip", "Squeaky", "Pip"]
    };

    // Descrições realistas
    const descricoesPorTipo = {
        "Cachorro": [
            "Muito brincalhão e carinhoso, adora crianças e outros animais.",
            "Tranquilo e obediente, perfeito para apartamento.",
            "Energético e alegre, precisa de espaço para correr.",
            "Protetor e leal, ótimo companheiro para a família.",
            "Inteligente e fácil de treinar, adora aprender truques novos."
        ],
        "Gato": [
            "Calmo e independente, perfeito para quem trabalha fora.",
            "Brincalhão e curioso, adora explorar ambientes novos.",
            "Carinhoso e tranquilo, gosta de colo e carinho.",
            "Ativo e inteligente, adora brinquedos interativos.",
            "Sociável e amigável, se dá bem com outros animais."
        ],
        "Coelho": [
            "Tranquilo e fofinho, adora cenouras e ficar no colo.",
            "Curioso e ativo, precisa de espaço para pular e explorar.",
            "Carinhoso e calmo, perfeito para crianças responsáveis.",
            "Brincalhão e inteligente, adora túneis e brinquedos."
        ],
        "Pássaro": [
            "Cantora e alegre, enche a casa de música e vida.",
            "Inteligente e curiosa, adora interagir com a família.",
            "Tranquila e carinhosa, perfeita para apartamento.",
            "Brincalhona e ativa, adora brinquedos coloridos."
        ],
        "Hamster": [
            "Ativo e divertido, adora correr na rodinha.",
            "Curioso e fofinho, perfeito para observar.",
            "Tranquilo e fácil de cuidar, ideal para iniciantes.",
            "Brincalhão e energético, adora túneis e esconderijos."
        ]
    };

    console.log("🐕 Criando 100 pets realistas...");
    const pets = [];

    for (let i = 1; i <= 100; i++) {
        const tipo = tiposCadastrados[Math.floor(Math.random() * tiposCadastrados.length)];
        const tipoNome = tipo.nome;

        // Escolher elementos aleatórios
        const nomes = nomesPorTipo[tipoNome];
        const imagens = imagensPorTipo[tipoNome];
        const descricoes = descricoesPorTipo[tipoNome];

        const nome = nomes[Math.floor(Math.random() * nomes.length)];
        const imagemUrl = imagens[Math.floor(Math.random() * imagens.length)];
        const descricao = descricoes[Math.floor(Math.random() * descricoes.length)];

        pets.push({
            nome: nome,
            idade: Math.floor(Math.random() * 10) + 1, // 1-10 anos
            tamanho: ["Pequeno", "Médio", "Grande"][Math.floor(Math.random() * 3)],
            descricao: descricao,
            tipoId: tipo.id,
            imagemUrl: imagemUrl,
        });
    }

    await prisma.pet.createMany({ data: pets });
    console.log("🎉 100 pets REALISTAS criados com sucesso!");
    console.log("📊 Estatísticas:");

    // Mostrar estatísticas
    for (const tipo of tiposCadastrados) {
        const count = pets.filter(p => p.tipoId === tipo.id).length;
        console.log(`${tipo.nome}: ${count} pets`);
    }
}

main()
    .catch((e) => {
        console.error("❌ Erro no seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
