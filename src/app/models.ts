export interface Pergunta {
    id_conversa: string; // ID da conversa
    pergunta: string;
}

export interface Conversa {
    id: string;
}

export interface Chat {
    id: string;
    pergunta: string;
    resposta: string;
    conversa: Conversa;
}