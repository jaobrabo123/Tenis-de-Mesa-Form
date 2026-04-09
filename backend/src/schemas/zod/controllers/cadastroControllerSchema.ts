import z from "zod";
import { emailSchema, stringSchema } from "../shared/basicsSchema";
import { telefoneSchema } from "../shared/utilsSchema";

const categorias = [
    'INICIANTE',
    'INTERMEDIARIO',
    'AVANCADO',
    'JUVENIL',
    'SENIOR'
] as const;

const modalidades = [
    'SIMPLES',
    'DUPLAS'
] as const;

const maosDominantes = [
    'DESTRO',
    'CANHOTO'
] as const;

export const cadastroSchema = z.strictObject({
    nome: stringSchema
        .nonempty('Nome deve ser fornecido.')
        .max(150, 'Nome deve ter até 150 caracteres.'),
    dataNascimento: z.coerce.date('Data de nascimento deve ser uma data válida.')
        .max(new Date(), 'Não pode ser uma data futura.'),
    emailContato: emailSchema,
    telefone: telefoneSchema,
    categoria: z.enum(categorias, `Categoria inválida (${categorias}).`),
    modalidade: z.enum(modalidades, `Modalidade inválida (${modalidades}).`),
    maoDominante: z.enum(maosDominantes, `Mão dominante inválida (${maosDominantes}).`)
        .nullable()
        .optional()
}).refine(obj=> {
    const hoje = new Date();
    const { dataNascimento, categoria } = obj;
    let idade =  hoje.getFullYear() - dataNascimento.getFullYear();
    if(dataNascimento.getMonth() > hoje.getMonth() || (dataNascimento.getMonth() === hoje.getMonth() && dataNascimento.getDate() > hoje.getDate())){
        idade --;
    }

    if(idade > 16 && categoria === 'JUVENIL') return false;
    if(idade < 50 && categoria === 'SENIOR') return false;
    return true;
}, {
    message: 'Categoria inválida para a sua idade.',
    path: ['categoria']
});
export type CadastroDTO = z.output<typeof cadastroSchema>;