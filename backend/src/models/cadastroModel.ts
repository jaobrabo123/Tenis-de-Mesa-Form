import { Categoria, MaoDominante, Modalidade } from "@generated/prisma/enums";

export interface Cadastro {
    id: string;
    nome: string;
    dataNascimento: Date;
    emailContato: string;
    telefone: string;
    categoria: Categoria;
    modalidade: Modalidade;
    maoDominante: MaoDominante | null;
    dataCriacao: Date;
    dataAtualizacao: Date;
}