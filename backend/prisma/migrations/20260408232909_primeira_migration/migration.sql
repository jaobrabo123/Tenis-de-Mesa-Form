-- CreateEnum
CREATE TYPE "categoria" AS ENUM ('INICIANTE', 'INTERMEDIARIO', 'AVANCADO', 'JUVENIL', 'SENIOR');

-- CreateEnum
CREATE TYPE "modalidade" AS ENUM ('SIMPLES', 'DUPLAS');

-- CreateEnum
CREATE TYPE "mao_dominante" AS ENUM ('DESTRO', 'CANHOTO');

-- CreateTable
CREATE TABLE "cadastro" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(150) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "email_contato" VARCHAR(254) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "categoria" "categoria" NOT NULL,
    "modalidade" "modalidade" NOT NULL,
    "mao_dominante" "mao_dominante",
    "data_criacao" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "cadastro_pkey" PRIMARY KEY ("id")
);
