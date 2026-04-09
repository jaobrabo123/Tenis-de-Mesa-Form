import { stringSchema } from "./basicsSchema";

export const telefoneSchema = stringSchema
    .max(11, 'O telefone deve conter no máximo 11 dígitos numéricos')
    .regex(/^\d*$/, 'O telefone deve conter apenas dígitos numéricos');