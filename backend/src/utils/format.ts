import { Meta } from '@schemas/entities/responseEntity';
import { deburr } from 'lodash';

type GenMetaObject =
    | {
        page?: number;
        perPage?: number;
        total?: number;
        cached?: boolean;
        skip?: undefined;
        take?: undefined;
    }
    | {
        page?: undefined;
        perPage?: undefined;
        total?: number;
        skip?: number;
        take?: number;
        cached?: boolean;
    };

class FormatUtils {

    /**
     * Converte uma string de tempo em um valor numérico de milissegundos. A string pode ser composta por um número seguido de um sufixo que indica a unidade de tempo (d para dias, h para horas, m para minutos, s para segundos). Se a string for apenas um número, será interpretada como milissegundos.
     */
    static getMilisecondsByText(text: string){
        const textLower = text.toLowerCase();
        const lastCharacter = textLower.at(-1)!;
        if(!isNaN(parseInt(lastCharacter))) return Number(textLower);
        else {
            const numericString = Number(textLower.slice(0, -1));
            if(isNaN(numericString)) return 0;
            let conversion = 1;
            if(lastCharacter==='d') conversion = 24*60*60*1000;
            else if(lastCharacter==='h') conversion = 60*60*1000;
            else if(lastCharacter==='m') conversion = 60*1000;
            else if(lastCharacter==='s') conversion = 1000;
            return numericString * conversion;
        }
    }

    static normalizeString(strings: string[]): string[];
    static normalizeString(strings: string): string;
    static normalizeString(strings: string | string[]){
        if(Array.isArray(strings))
            return strings.map(st=>deburr(st.trim().toLowerCase()))
        return deburr(strings.trim().toLowerCase())
    }

    static genMetaObject(data: GenMetaObject){
        const { cached, total, page, perPage, skip, take } = data;
        const totalPages = total && perPage ? Math.ceil(total/perPage) : undefined;
        const hasNextPage = totalPages && page ? totalPages > page : undefined;
        return {
            cached, total, page, perPage, skip, take,
            totalPages, hasNextPage
        } satisfies Meta
    }

}

export default FormatUtils;