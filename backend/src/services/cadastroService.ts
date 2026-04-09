import CadastroRepository from "@repositories/cadastroRepository";
import { CadastroDTO } from "@schemas/zod/controllers/cadastroControllerSchema";
import { ConflictError } from "@utils/errorClasses";

export default class CadastroService {

    static async cadastro(dto: CadastroDTO){

        const existePorEmailContato = await CadastroRepository.existsByEmailContato(dto.emailContato);
        if(existePorEmailContato)
            throw new ConflictError("Já existe um cadastro com esse email.");

        return await CadastroRepository.create(dto);

    }

}