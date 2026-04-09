import z from "zod";
import { emailSchema, stringSchema } from "../shared/basicsSchema";
import { telefoneSchema } from "../shared/utilsSchema";

export const cadastroSchema = z.strictObject({
    nome: stringSchema
        .nonempty('Nome deve ser fornecido.')
        .max(150, 'Nome deve ter até 150 caracteres.'),
    dataNascimento: z.coerce.date('Data de nascimento deve ser uma data válida.')
        .max(new Date(), 'Não pode ser uma data futura.'),
    emailContato: emailSchema,
    telefone: telefoneSchema,
    categoria: z.enum([
        'INICIANTE',
        'INTERMEDIARIO',
        'AVANCADO',
        'JUVENIL',
        'SENIOR'
    ], 'Categoria inválida.'),
    modalidade: z.enum([
        'SIMPLES',
        'DUPLAS'
    ], 'Modalidade inválida.'),
    maoDominante: z.enum([
        'DESTRO',
        'CANHOTO'
    ], 'Mão dominante inválida.')
        .nullable()
        .optional()
});
export type CadastroDTO = z.output<typeof cadastroSchema>;