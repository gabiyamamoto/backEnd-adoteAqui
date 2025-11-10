-- CreateTable
CREATE TABLE "Tipos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipoId" INTEGER NOT NULL,
    "raca" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "adotado" BOOLEAN NOT NULL DEFAULT false,
    "vacinado" BOOLEAN NOT NULL DEFAULT false,
    "castrado" BOOLEAN NOT NULL DEFAULT false,
    "descricao" TEXT,
    "imagemUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tipos_nome_key" ON "Tipos"("nome");

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
