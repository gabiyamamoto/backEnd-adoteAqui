import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Iniciando seed...")

    try {
        await prisma.$connect()
        console.log('✅ Conectado ao banco de dados')

        // VERIFICAR SE JÁ EXISTEM DADOS (opcional - evita duplicação)
        const tiposExistentes = await prisma.tipos.count()
        const petsExistentes = await prisma.pets.count()

        if (tiposExistentes > 0) {
            console.log('📊 Banco já populado. Pulando seed...')
            console.log(`   Tipos: ${tiposExistentes}`)
            console.log(`   Pets: ${petsExistentes}`)
            return
        }

        console.log('🧹 Limpando dados existentes...')
        await prisma.pets.deleteMany()
        await prisma.tipos.deleteMany()
        console.log('✅ Dados antigos removidos')

        // ----- LISTAS DE RAÇAS -----
        // 50 raças de cachorro
        const racasCachorro = [
            'Golden Retriever', 'Labrador Retriever', 'Bulldog Francês', 'Poodle',
            'Shih Tzu', 'Pug', 'Dachshund', 'Beagle', 'Schnauzer', 'Yorkshire Terrier',
            'Rottweiler', 'Pastor Alemão', 'Boxer', 'Husky Siberiano', 'Dálmata',
            'Chihuahua', 'Lhasa Apso', 'Cocker Spaniel', 'Border Collie', 'Pitbull',
            'Maltês', 'Buldogue Inglês', 'São Bernardo', 'Akita', 'Doberman',
            'Weimaraner', 'Shar Pei', 'Basset Hound', 'Mastiff', 'Bloodhound',
            'Setter Irlandês', 'Pointer', 'Whippet', 'Saluki', 'Samoeida',
            'Chow Chow', 'Terrier Escocês', 'Westie', 'Jack Russell', 'Boston Terrier',
            'Pomeranian', 'Shiba Inu', 'Corgi', 'Malamute', 'Pastor Australiano',
            'Pastor Belga', 'Cane Corso', 'Fila Brasileiro', 'Dogo Argentino', 'Bull Terrier',
            'Papillon'
        ]

        // 30 raças de gato
        const racasGato = [
            'Siamês', 'Persa', 'Maine Coon', 'Angorá', 'Sphynx',
            'Ragdoll', 'Bengal', 'British Shorthair', 'Scottish Fold', 'Russian Blue',
            'Birmanês', 'Abissínio', 'Somali', 'Burmês', 'Tonquinês',
            'Oriental', 'Devon Rex', 'Cornish Rex', 'Chartreux', 'Bombay',
            'Himalaio', 'Exótico', 'Selkirk Rex', 'LaPerm', 'Singapura',
            'Peterbald', 'Korat', 'Burmilla', 'Snowshoe', 'Toyger'
        ]

        // 10 raças de coelho
        const racasCoelho = [
            'Coelho Holandês', 'Coelho Angorá', 'Coelho Rex', 'Coelho Cabeça de Leão',
            'Coelho Mini Lop', 'Coelho Flemish Giant', 'Coelho Hotot', 'Coelho Californiano',
            'Coelho Himalaio', 'Coelho Nova Zelândia'
        ]

        // 5 pássaros
        const racasPassaro = [
            'Calopsita', 'Periquito Australiano', 'Agapornis', 'Cacatua', 'Canário'
        ]

        // 5 hamsters
        const racasHamster = [
            'Hamster Sírio', 'Hamster Anão Russo', 'Hamster Roborovski', 'Hamster Chinês', 'Hamster Campbell'
        ]

        // ARRAY DE TIPOS COM IMAGENS
        const tipos = [

            { nome_tipo: 'Golden Retriever', especie: 'cachorro', imageUrl: 'https://i.ibb.co/Q7yMncFB/Golden-Retriever.webp' },
            { nome_tipo: 'Labrador Retriever', especie: 'cachorro', imageUrl: 'https://i.ibb.co/v6bDnkh8/Labrador-Retriever.webp' },
            { nome_tipo: 'Bulldog Francês', especie: 'cachorro', imageUrl: 'https://i.ibb.co/k6QkyQ7Y/Bulldog-Francês.webp' },
            { nome_tipo: 'Poodle', especie: 'cachorro', imageUrl: 'https://i.ibb.co/r8YssYd/Poodle.webp' },
            { nome_tipo: 'Shih Tzu', especie: 'cachorro', imageUrl: 'https://i.ibb.co/cXNQKHb6/Shih-Tzu.webp' },
            { nome_tipo: 'Pug', especie: 'cachorro', imageUrl: 'https://i.ibb.co/5W5H4zMn/Pug.webp' },
            { nome_tipo: 'Dachshund', especie: 'cachorro', imageUrl: 'https://i.ibb.co/WvS4qkNf/Dachshund.webp' },
            { nome_tipo: 'Beagle', especie: 'cachorro', imageUrl: 'https://i.ibb.co/fYRmDpGP/Beagle.webp' },
            { nome_tipo: 'Schnauzer', especie: 'cachorro', imageUrl: 'https://i.ibb.co/HpThGFk4/Schnauzer.webp' },
            { nome_tipo: 'Yorkshire Terrier', especie: 'cachorro', imageUrl: 'https://i.ibb.co/j9jsWwGx/Yorkshire-Terrier.webp' },
            { nome_tipo: 'Rottweiler', especie: 'cachorro', imageUrl: 'https://i.ibb.co/r242CDrs/Rottweiler.webp' },
            { nome_tipo: 'Pastor Alemão', especie: 'cachorro', imageUrl: 'https://i.ibb.co/8DdnThg6/Pastor-Alemão.webp' },
            { nome_tipo: 'Boxer', especie: 'cachorro', imageUrl: 'https://i.ibb.co/yBbjL5R3/Boxer.webp' },
            { nome_tipo: 'Husky Siberiano', especie: 'cachorro', imageUrl: 'https://i.ibb.co/chL6Q6yp/Husky-Siberiano.webp' },
            { nome_tipo: 'Dálmata', especie: 'cachorro', imageUrl: 'https://i.ibb.co/6c1cJd6M/Dálmata.webp' },
            { nome_tipo: 'Chihuahua', especie: 'cachorro', imageUrl: 'https://i.ibb.co/0jzT7ZbM/Chihuahua.webp' },
            { nome_tipo: 'Lhasa Apso', especie: 'cachorro', imageUrl: 'https://i.ibb.co/fVD3qmBk/Lhasa-Apso.webp' },
            { nome_tipo: 'Cocker Spaniel', especie: 'cachorro', imageUrl: 'https://i.ibb.co/3m2SkCRv/Cocker-Spaniel.webp' },
            { nome_tipo: 'Border Collie', especie: 'cachorro', imageUrl: 'https://i.ibb.co/9HCBYGGX/Border-Collie.webp' },
            { nome_tipo: 'Pitbull', especie: 'cachorro', imageUrl: 'https://i.ibb.co/p6xJ5F39/Pitbull.webp' },
            { nome_tipo: 'Maltês', especie: 'cachorro', imageUrl: 'https://i.ibb.co/W4G97wry/Maltês.webp' },
            { nome_tipo: 'Buldogue Inglês', especie: 'cachorro', imageUrl: 'https://i.ibb.co/Z6GWmGdD/Buldogue-Inglês.webp' },
            { nome_tipo: 'São Bernardo', especie: 'cachorro', imageUrl: 'https://i.ibb.co/6JZ0djFV/São-Bernardo.webp' },
            { nome_tipo: 'Akita', especie: 'cachorro', imageUrl: 'https://i.ibb.co/Y41xCHdR/Akita.webp' },
            { nome_tipo: 'Doberman', especie: 'cachorro', imageUrl: 'https://i.ibb.co/RT9Wvd0Z/Doberman.webp' },
            { nome_tipo: 'Weimaraner', especie: 'cachorro', imageUrl: 'https://i.ibb.co/zV3tcZwJ/Weimaraner.webp' },
            { nome_tipo: 'Shar Pei', especie: 'cachorro', imageUrl: 'https://i.ibb.co/9HFmFkK5/Shar-Pei.webp' },
            { nome_tipo: 'Basset Hound', especie: 'cachorro', imageUrl: 'https://i.ibb.co/LzktfSsc/Basset-Hound.webp' },
            { nome_tipo: 'Mastiff', especie: 'cachorro', imageUrl: 'https://i.ibb.co/CLhZkCq/Mastiff.webp' },
            { nome_tipo: 'Bloodhound', especie: 'cachorro', imageUrl: 'https://i.ibb.co/F4Hg5PQF/Bloodhound.webp' },
            { nome_tipo: 'Setter Irlandês', especie: 'cachorro', imageUrl: 'https://i.ibb.co/JRW6yHL0/Setter-Irlandês.webp' },
            { nome_tipo: 'Pointer', especie: 'cachorro', imageUrl: 'https://i.ibb.co/LX24xykg/Pointer.webp' },
            { nome_tipo: 'Whippet', especie: 'cachorro', imageUrl: 'https://i.ibb.co/8nZvSdMc/Whippet.webp' },
            { nome_tipo: 'Saluki', especie: 'cachorro', imageUrl: 'https://i.ibb.co/4RNjjpmg/Saluki.webp' },
            { nome_tipo: 'Samoeida', especie: 'cachorro', imageUrl: 'https://i.ibb.co/fV0Nd26y/Samoeida.webp' },
            { nome_tipo: 'Chow Chow', especie: 'cachorro', imageUrl: 'https://i.ibb.co/DDL22pJq/Chow-Chow.webp' },
            { nome_tipo: 'Terrier Escocês', especie: 'cachorro', imageUrl: 'https://i.ibb.co/fdfjY1kY/Terrier-Escocês.webp' },
            { nome_tipo: 'Westie', especie: 'cachorro', imageUrl: 'https://i.ibb.co/TDL4YfYx/Westie.webp' },
            { nome_tipo: 'Jack Russell', especie: 'cachorro', imageUrl: 'https://i.ibb.co/zT6mf63c/Jack-Russell.webp' },
            { nome_tipo: 'Boston Terrier', especie: 'cachorro', imageUrl: 'https://i.ibb.co/5gVF6DT9/Boston-Terrier.webp' },
            { nome_tipo: 'Papillon', especie: 'cachorro', imageUrl: 'https://i.ibb.co/qM7stwJz/Papillon.webp' },
            { nome_tipo: 'Shiba Inu', especie: 'cachorro', imageUrl: 'https://i.ibb.co/hJVjJRS1/Shiba-Inu.webp' },
            { nome_tipo: 'Corgi', especie: 'cachorro', imageUrl: 'https://i.ibb.co/NdfRxDnk/Corgi.webp' },
            { nome_tipo: 'Malamute', especie: 'cachorro', imageUrl: 'https://i.ibb.co/vNVzDY0/Malamute.webp' },
            { nome_tipo: 'Pastor Australiano', especie: 'cachorro', imageUrl: 'https://i.ibb.co/fYPfKwb0/Pastor-Australiano.webp' },

            { nome_tipo: 'Pastor Belga', especie: 'cachorro', imageUrl: 'https://i.ibb.co/DD1RbLhz/Pastor-Belga.webp' },
            { nome_tipo: 'Cane Corso', especie: 'cachorro', imageUrl: 'https://i.ibb.co/YFJjLGpG/Cane-Corso.webp' },
            { nome_tipo: 'Fila Brasileiro', especie: 'cachorro', imageUrl: 'https://i.ibb.co/KcTpG1pz/Fila-Brasileiro.webp' },
            { nome_tipo: 'Dogo Argentino', especie: 'cachorro', imageUrl: 'https://i.ibb.co/gYBNV2g/Dogo-Argentino.webp' },
            { nome_tipo: 'Bull Terrier', especie: 'cachorro', imageUrl: 'https://i.ibb.co/5gZJN7bY/Bull-Terrier.webp' },
            { nome_tipo: 'Siamês', especie: 'gato', imageUrl: 'https://i.ibb.co/Zn26M9r/Siamês.webp' },
            { nome_tipo: 'Persa', especie: 'gato', imageUrl: 'https://i.ibb.co/Y4ysccPp/Persa.webp' },
            { nome_tipo: 'Maine Coon', especie: 'gato', imageUrl: 'https://i.ibb.co/QjrG7Q4s/Maine-Coon.webp' },
            { nome_tipo: 'Angorá', especie: 'gato', imageUrl: 'https://i.ibb.co/VW0j5k84/Angorá.webp' },
            { nome_tipo: 'Sphynx', especie: 'gato', imageUrl: 'https://i.ibb.co/N6cwWxkV/Sphynx.webp' },
            { nome_tipo: 'Ragdoll', especie: 'gato', imageUrl: 'https://i.ibb.co/b5rNzM7Z/Ragdoll.webp' },
            { nome_tipo: 'Bengal', especie: 'gato', imageUrl: 'https://i.ibb.co/q3v7DJwb/Bengal.webp' },
            { nome_tipo: 'British Shorthair', especie: 'gato', imageUrl: 'https://i.ibb.co/Dgtzw7hm/British-Shorthair.webp' },
            { nome_tipo: 'Scottish Fold', especie: 'gato', imageUrl: 'https://i.ibb.co/v6Ns5xzJ/Scottish-Fold.webp' },
            { nome_tipo: 'Russian Blue', especie: 'gato', imageUrl: 'https://i.ibb.co/Qvr0YXdg/Russian-Blue.webp' },
            { nome_tipo: 'Birmanês', especie: 'gato', imageUrl: 'https://i.ibb.co/RGZR7Vfj/Birmanês.webp' },
            { nome_tipo: 'Abissínio', especie: 'gato', imageUrl: 'https://i.ibb.co/cVTPBS8/Abissínio.webp' },
            { nome_tipo: 'Somali', especie: 'gato', imageUrl: 'https://i.ibb.co/3y5Mh3WG/Somali.webp' },
            { nome_tipo: 'Burmês', especie: 'gato', imageUrl: 'https://i.ibb.co/FbxcPKJY/Burmês.webp' },
            { nome_tipo: 'Tonquinês', especie: 'gato', imageUrl: 'https://i.ibb.co/xKPRDKyR/Tonquinês.webp' },
            { nome_tipo: 'Oriental', especie: 'gato', imageUrl: 'https://i.ibb.co/m5dMsdPz/Oriental.webp' },
            { nome_tipo: 'Devon Rex', especie: 'gato', imageUrl: 'https://i.ibb.co/GfDkJf49/Devon-Rex.webp' },
            { nome_tipo: 'Cornish Rex', especie: 'gato', imageUrl: 'https://i.ibb.co/Y78gJvZV/Cornish-Rex.webp' },
            { nome_tipo: 'Chartreux', especie: 'gato', imageUrl: 'https://i.ibb.co/zVBGkL30/Chartreux.webp' },
            { nome_tipo: 'Bombay', especie: 'gato', imageUrl: 'https://i.ibb.co/gMV6n7rM/Bombay.webp' },
            { nome_tipo: 'Himalaio', especie: 'gato', imageUrl: 'https://i.ibb.co/XrNC16Ft/Himalaio.webp' },
            { nome_tipo: 'Exótico', especie: 'gato', imageUrl: 'https://i.ibb.co/TDFZ78hz/Exótico.webp' },
            { nome_tipo: 'Selkirk Rex', especie: 'gato', imageUrl: 'https://i.ibb.co/Nn7JRfdt/Selkirk-Rex.webp' },
            { nome_tipo: 'LaPerm', especie: 'gato', imageUrl: 'https://i.ibb.co/zh4rsFYV/LaPerm.webp' },
            { nome_tipo: 'Singapura', especie: 'gato', imageUrl: 'https://i.ibb.co/wrPZknct/Singapura.webp' },

            { nome_tipo: 'Peterbald', especie: 'gato', imageUrl: 'https://i.ibb.co/xtgz4rhy/Peterbald.webp' },
            { nome_tipo: 'Korat', especie: 'gato', imageUrl: 'https://i.ibb.co/38JpY0X/Korat.webp' },
            { nome_tipo: 'Burmilla', especie: 'gato', imageUrl: 'https://i.ibb.co/pvqmL0cj/Burmilla.webp' },
            { nome_tipo: 'Snowshoe', especie: 'gato', imageUrl: 'https://i.ibb.co/2348MyrW/Snowshoe.webp' },
            { nome_tipo: 'Toyger', especie: 'gato', imageUrl: 'https://i.ibb.co/4R4r9jVV/Toyger.webp' },
            { nome_tipo: 'Coelho Holandês', especie: 'coelho', imageUrl: 'https://i.ibb.co/8nNjZ3sL/Coelho-Holandês.webp' },
            { nome_tipo: 'Coelho Angorá', especie: 'coelho', imageUrl: 'https://i.ibb.co/4ncRcqP4/Coelho-Angorá.webp' },
            { nome_tipo: 'Coelho Rex', especie: 'coelho', imageUrl: 'https://i.ibb.co/gFP69QVK/Coelho-Rex.webp' },
            { nome_tipo: 'Coelho Cabeça de Leão', especie: 'coelho', imageUrl: 'https://i.ibb.co/V0N68Jdy/Coelho-Cabeça-de-Leão.webp' },
            { nome_tipo: 'Coelho Mini Lop', especie: 'coelho', imageUrl: 'https://i.ibb.co/Df2ZC6fQ/Coelho-Mini-Lop.webp' },
            { nome_tipo: 'Coelho Flemish Giant', especie: 'coelho', imageUrl: 'https://i.ibb.co/vCrRTK0z/Coelho-Flemish-Giant.webp' },
            { nome_tipo: 'Coelho Hotot', especie: 'coelho', imageUrl: 'https://i.ibb.co/zYBxx90/Coelho-Hotot.webp' },
            { nome_tipo: 'Coelho Californiano', especie: 'coelho', imageUrl: 'https://i.ibb.co/yFpMGRvP/Coelho-Californiano.webp' },
            { nome_tipo: 'Coelho Himalaio', especie: 'coelho', imageUrl: 'https://i.ibb.co/MD12jnsC/Coelho-Himalaio.webp' },
            { nome_tipo: 'Coelho Nova Zelândia', especie: 'coelho', imageUrl: 'https://i.ibb.co/qLjpHxDQ/Coelho-Nova-Zelândia.webp' },

            { nome_tipo: 'Calopsita', especie: 'pássaro', imageUrl: 'https://i.ibb.co/0jyLxhsR/Calopsita.webp' },
            { nome_tipo: 'Periquito Australiano', especie: 'pássaro', imageUrl: 'https://i.ibb.co/FqN52sLD/Periquito-Australiano.webp' },
            { nome_tipo: 'Agapornis', especie: 'pássaro', imageUrl: 'https://i.ibb.co/kVr1kC9Q/Agapornis.webp' },
            { nome_tipo: 'Cacatua', especie: 'pássaro', imageUrl: 'https://i.ibb.co/CpHMdpCC/Cacatua.webp' },
            { nome_tipo: 'Canário', especie: 'pássaro', imageUrl: 'https://i.ibb.co/QjQvcvfn/Canário.webp' },
            { nome_tipo: 'Hamster Sírio', especie: 'hamster', imageUrl: 'https://i.ibb.co/npqCYyx/Hamster-Sírio.webp' },
            { nome_tipo: 'Hamster Anão Russo', especie: 'hamster', imageUrl: 'https://i.ibb.co/QFqQK86F/Hamster-Anão-Russo.webp' },
            { nome_tipo: 'Hamster Roborovski', especie: 'hamster', imageUrl: 'https://i.ibb.co/5xhC2cXz/Hamster-Roborovski.webp' },
            { nome_tipo: 'Hamster Chinês', especie: 'hamster', imageUrl: 'https://i.ibb.co/TMGKQG58/Hamster-Chinês.webp' },
            { nome_tipo: 'Hamster Campbell', especie: 'hamster', imageUrl: 'https://i.ibb.co/20x3jVMX/Hamster-Campbell.webp' },
        ]
        // CRIAR TIPOS
        console.log('📝 Criando tipos...')
        const tiposCriados = await prisma.tipos.createMany({
            data: tipos
        })
        console.log(`✅ ${tiposCriados.count} tipos criados`)

        // BUSCAR TIPOS DO BANCO
        const tiposDoBanco = await prisma.tipos.findMany()
        console.log(`📊 ${tiposDoBanco.length} tipos carregados do banco`)

        // ----- DADOS PARA PETS -----
        const nomesMachos = [
            'max', 'thor', 'rex', 'toby', 'bob', 'luke', 'zeus', 'oscar', 'simba', 'rocky',
            'leo', 'jack', 'billy', 'marley', 'lucky', 'duke', 'bear', 'milo', 'apollo', 'buddy',
            'charlie', 'cooper', 'teddy', 'winston', 'oliver', 'mike', 'bento', 'fred', 'hugo',
            'igor', 'jade', 'kiko', 'luan', 'niko', 'otto', 'pipo', 'raul', 'sandro', 'tito',
            'urso', 'vini', 'xodo', 'yoda', 'zack', 'tom', 'rick', 'noah', 'bruce', 'casper', 'sam'
        ]

        const nomesFemeas = [
            'luna', 'lola', 'bella', 'molly', 'sophie', 'chloe', 'daisy', 'maggie', 'stella', 'lily',
            'penny', 'zoey', 'ruby', 'sadie', 'ginger', 'princess', 'coco', 'rosie', 'niki', 'mia',
            'mel', 'flora', 'grace', 'helen', 'iris', 'july', 'kiara', 'laila', 'maya', 'nina',
            'olga', 'paola', 'queen', 'ruth', 'sarah', 'tina', 'violet', 'wanda', 'yara', 'zara',
            'bela', 'cindy', 'duda', 'elza', 'frida', 'gabi', 'hanna', 'ines', 'juju', 'kelly', 'lara'
        ]

        const locais = [
            'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Porto Alegre, RS',
            'Florianópolis, SC', 'Salvador, BA', 'Fortaleza, CE', 'Recife, PE', 'Brasília, DF',
            'Goiânia, GO', 'Manaus, AM', 'Belém, PA', 'São Luís, MA', 'Maceió, AL',
            'Natal, RN', 'João Pessoa, PB', 'Teresina, PI', 'Campo Grande, MS', 'Cuiabá, MT',
            'Aracaju, SE', 'Palmas, TO', 'Porto Velho, RO', 'Rio Branco, AC', 'Macapá, AP',
            'Boa Vista, RR', 'Vitória, ES', 'São José dos Campos, SP', 'Ribeirão Preto, SP', 'Campinas, SP',
            'Sorocaba, SP', 'Santos, SP', 'São Bernardo do Campo, SP', 'Osasco, SP', 'Guarulhos, SP',
            'Niterói, RJ', 'Duque de Caxias, RJ', 'São Gonçalo, RJ', 'Petrópolis, RJ', 'Volta Redonda, RJ',
            'Uberlândia, MG', 'Contagem, MG', 'Juiz de Fora, MG', 'Betim, MG', 'Montes Claros, MG',
            'Londrina, PR', 'Maringá, PR', 'Cascavel, PR', 'Foz do Iguaçu, PR', 'Ponta Grossa, PR'
        ]

        const descricoesBase = [
            'Muito carinhoso e brincalhão, adora crianças e outros animais.',
            'Tranquilo e educado, perfeito para apartamento e ambientes calmos.',
            'Cheio de energia, ideal para famílias ativas que gostam de passeios.',
            'Dócil e companheiro, sempre pronto para receber carinho e atenção.',
            'Inteligente e obediente, aprende comandos rapidamente e é muito esperto.',
            'Independente mas afetuoso, gosta de seu espaço mas não dispensa um colo.',
            'Sociável e alegre, faz amigos facilmente com humanos e outros pets.',
            'Calmo e protetor, ótimo para idosos e ambientes tranquilos.',
            'Curioso e aventureiro, adora explorar novos ambientes e brincar ao ar livre.',
            'Fiel e dedicado, forma laços fortes com a família e é muito leal.',
            'Brincalhão e divertido, sempre animado e pronto para novas aventuras.',
            'Gosta de rotina, se adapta bem a horários e é muito comportado.',
            'Amoroso e apegado, segue os tutores por toda a casa pedindo atenção.',
            'Tímido no início, mas depois de ganhar confiança se torna muito carinhoso.',
            'Adora brinquedos, especialmente os que fazem barulho e bolinhas.',
            'Perfeito para primeiro pet, muito paciente e de fácil cuidado.',
            'Gosta de colo, é o companheiro ideal para Netflix no sofá.',
            'Ótimo com crianças, muito paciente e gentil com os pequenos.',
            'Adestrado, sabe fazer as necessidades no lugar certo e atende a chamado.',
            'Sapeca e levado, sempre inventando novas travessuras para se divertir.',
            'Gosta de outros animais, pode conviver bem com outros pets da casa.',
            'Protetor da casa, alerta sobre visitas mas não é agressivo.',
            'Silencioso e discreto, ideal para quem mora em apartamento.',
            'Adora passeios, fica super animado na hora do caminho ou coleira.',
            'Guloseimeiro, faz de tudo por um petisco e é fácil de agradar.',
            'Carente e amoroso, precisa de bastante atenção e carinho diário.',
            'Independente, perfeito para quem trabalha fora o dia todo.',
            'Aventureiro, adora explorar quintais e áreas externas.',
            'Calmo e sossegado, passa a maior parte do tempo descansando.',
            'Observador, gosta de ficar vendo a movimentação da casa da janela.',
            'Brincalhão com água, adora se molhar e brincar com mangueira.',
            'Companheiro para idosos, muito tranquilo e obediente.',
            'Energético, precisa de exercícios diários para gastar energia.',
            'Carinhoso com visitas, recebe todos muito bem e faz amizade fácil.',
            'Guarda instintos, protege a família sem ser agressivo.',
            'Adora carinho na barriga, se derrete todo por um cafuné.',
            'Inteligente e esperto, aprende truques novos com facilidade.',
            'Dorminhoco, passa boa parte do dia cochilando em lugares confortáveis.',
            'Curioso com sons, fica intrigado com barulhos diferentes.',
            'Ama cobertas, adora se aninhar em mantas e travesseiros fofos.',
            'Comedouro seletivo, tem suas preferências alimentares bem definidas.',
            'Brinca sozinho, se entretém com brinquedos quando está sozinho.',
            'Vocalizador, se comunica bastante através de sons e miados.',
            'Apaixonado por sol, adora tomar banhos de sol pela manhã.',
            'Limpo e organizado, mantém seu espaço sempre arrumado.',
            'Acompanhante perfeito, segue o tutor pela casa o dia todo.',
            'Brincalhão com bolinhas, não cansa de correr atrás delas.',
            'Gosta de rotina, se adapta bem a horários fixos de alimentação.',
            'Amoroso com todos, não faz distinção entre pessoas da família.',
            'Temperamento equilibrado, nem muito agitado nem muito parado.'
        ]

        const descricoesMachos = descricoesBase.slice()

        const descricoesFemeas = descricoesBase.map(text => {
            let s = text
                .replace(/\bcarinhoso\b/gi, 'carinhosa')
                .replace(/\bbrincalhão\b/gi, 'brincalhona')
                .replace(/\bprotetor\b/gi, 'protetora')
                .replace(/\bapaixonado\b/gi, 'apaixonada')
                .replace(/\bcompanheiro\b/gi, 'companheira')
                .replace(/\bdorminhoco\b/gi, 'dorminhoca')
                .replace(/\bobservador\b/gi, 'observadora')
                .replace(/\bcurioso\b/gi, 'curiosa')
                .replace(/\bagressivo\b/gi, 'agressiva')
                .replace(/\bcalmo\b/gi, 'calma')
                .replace(/\blevado\b/gi, 'levada')
            return s
        })

        const idades = ['filhote', 'adulto', 'idoso']
        const tamanhos = ['pequeno', 'médio', 'grande']

        // HELPER FUNCTIONS
        function rnd(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }

        function chance(prob) {
            return Math.random() < prob
        }

        // CRIAR PETS
        console.log('🐕 Criando pets...')
        let petsCriados = 0

        for (const tipo of tiposDoBanco) {
            for (let j = 0; j < 4; j++) {
                const genero = chance(0.5) ? 'macho' : 'fêmea'
                const nome = genero === 'macho' ? rnd(nomesMachos) : rnd(nomesFemeas)
                const idade = rnd(idades)
                const tamanho = rnd(tamanhos)
                const local = rnd(locais)
                const adotado = chance(0.15)
                const vacinado = chance(0.8)
                const castrado = chance(0.6)
                const descricao = genero === 'macho' ? rnd(descricoesMachos) : rnd(descricoesFemeas)

                await prisma.pets.create({
                    data: {
                        nome,
                        tipoId: tipo.id,
                        idade,
                        tamanho,
                        genero,
                        local,
                        adotado,
                        vacinado,
                        castrado,
                        descricao
                    }
                })
                petsCriados++

                if (petsCriados % 50 === 0) {
                    console.log(`   ✅ ${petsCriados} pets criados...`)
                }
            }
        }

        // VERIFICAÇÃO FINAL
        const totalTipos = await prisma.tipos.count()
        const totalPets = await prisma.pets.count()

        console.log('🎉 SEED CONCLUÍDA:')
        console.log(`   📊 ${totalTipos} tipos criados`)
        console.log(`   🐾 ${totalPets} pets criados`)
        console.log('   ✅ Banco populado com sucesso!')

    } catch (error) {
        console.error('❌ Erro no seed:', error)
        throw error
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log('🎉 Seed finalizado!');
    })
    .catch(async (e) => {
        console.error('💥 Erro no seed:', e);
        await prisma.$disconnect();
        process.exit(1);
    })