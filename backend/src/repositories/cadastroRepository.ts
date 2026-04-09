import prisma from "@configs/db";
import { ClientOrTransaction, PrismaPagination } from "@schemas/entities/prismaEntity";
import { cadastroCreateInput, cadastroSelect } from "@generated/prisma/models";
import { Cadastro } from "@models/cadastroModel";

interface Entity {
    model: Cadastro;
    createInput: cadastroCreateInput;
    select: cadastroSelect;
}

export default class CadastroRepository {

    static readonly TABLE_NAME = 'cadastro' as const;
    static readonly PUBLIC_SELECT = {
        id: true,
        nome: true,
        dataNascimento: true,
        emailContato: true,
        telefone: true,
        categoria: true,
        modalidade: true,
        maoDominante: true,
        dataAtualizacao: true,
        dataCriacao: true,
    } as const satisfies Entity["select"];

    static async create(data: Entity["createInput"], db: ClientOrTransaction = prisma): Promise<Entity["model"]> {
        return await db[this.TABLE_NAME].create({
            data, select: this.PUBLIC_SELECT
        });
    }

    static async findUniqueByEmailContato(emailContato: string, db: ClientOrTransaction = prisma): Promise<Entity["model"] | null> {
        return await db[this.TABLE_NAME].findUnique({
            where: { emailContato },
            select: this.PUBLIC_SELECT
        });
    }

    static async existsByEmailContato(emailContato: string, db: ClientOrTransaction = prisma): Promise<boolean> {
        return !!await db[this.TABLE_NAME].findUnique({
            where: { emailContato },
            select: { id: true }
        });
    }
    
}