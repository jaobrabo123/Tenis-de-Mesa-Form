import CadastroRepository from "@repositories/cadastroRepository";
import { VAGAS_TOTAIS } from "@utils/constants";

let vagasDisponiveisObj: {
    quantidade: number;
    ultimaAtualizacao?: Date;
} = {
    quantidade: 0,
    ultimaAtualizacao: undefined
};

export default class CadastroCache {

    static async vagasDisponiveis(){
        if(!vagasDisponiveisObj || !vagasDisponiveisObj.ultimaAtualizacao || vagasDisponiveisObj.ultimaAtualizacao < new Date(Date.now() - 5*60*1000)){
            console.log('atualizando vagas disponiveis');
            const vagasPreenchidas = await CadastroRepository.count();
            const vagasDisponiveis = VAGAS_TOTAIS - vagasPreenchidas;
            vagasDisponiveisObj.quantidade = Math.max(vagasDisponiveis, 0);
            vagasDisponiveisObj.ultimaAtualizacao = new Date();
            return vagasDisponiveis;
        }
        return vagasDisponiveisObj.quantidade;
    }

}