import CadastroCache from "@cache/cadastroCache";
import prisma from "@configs/db";
import CadastroRepository from "@repositories/cadastroRepository";
import { ErrorCustomVS } from "@schemas/entities/customErrorEntity";
import { CadastroDTO } from "@schemas/zod/controllers/cadastroControllerSchema";
import { VAGAS_TOTAIS } from "@utils/constants";
import { ConflictError, ServerError, ValidationError } from "@utils/errorClasses";

export default class CadastroService {

    private static limiteAtingido = false;

    static async cadastro(dto: CadastroDTO) {

        if(this.limiteAtingido)
            throw new ValidationError("Limite de vagas atingido.");

        const maximoTentativas = 3;
        for (let tentativas = 1; tentativas <= maximoTentativas; tentativas++) {
            try {
                return await prisma.$transaction(async(tx)=>{
                    const vagasPreenchidas = await CadastroRepository.count(tx);
                    const vagasDisponiveis = VAGAS_TOTAIS - vagasPreenchidas;

                    if(vagasDisponiveis <= 0) {
                        this.limiteAtingido = true;
                        CadastroCache.setarTodasVagasPreenchidas();
                        throw new ValidationError("Limite de vagas atingido.");
                    }

                    const existePorEmailContato = await CadastroRepository.existsByEmailContato(dto.emailContato, tx);
                    if (existePorEmailContato)
                        throw new ConflictError("Já existe um cadastro com esse email.");

                    return await CadastroRepository.create(dto, tx);  
                }, {
                    isolationLevel: 'Serializable'
                });
            } catch (err) {
                const erro = err as ErrorCustomVS;
                if(erro.code === 'P2034'){
                    if(tentativas === maximoTentativas)
                        throw new ServerError("Tente novamente mais tarde.");

                    await new Promise(r=> setTimeout(r, Math.round(Math.random() * 50 + 100)));
                    continue;
                }

                throw erro;
            }
        }

    }

    static async vagasDisponiveis() {
        const vagasDisponiveis = await CadastroCache.vagasDisponiveis();
        return { vagasDisponiveis };
    }

}