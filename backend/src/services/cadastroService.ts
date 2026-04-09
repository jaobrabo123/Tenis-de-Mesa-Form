import CadastroRepository from "@repositories/cadastroRepository";
import { CadastroDTO } from "@schemas/zod/controllers/cadastroControllerSchema";

export default class CadastroService {

    static async cadastro(dto: CadastroDTO){

        return await CadastroRepository.create(dto);

    }

}