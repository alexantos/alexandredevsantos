import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversa, Paginacao } from './models';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConversaService {

    constructor(private httpClient: HttpClient) { }


    pegarId(id: string): Observable<Paginacao<Conversa>> {
        return this.httpClient.get<Paginacao<Conversa>>(environment.url_back + '/conversas/' + id)
    }

    criar(conversa: any = {}): Observable<Conversa> {
        return this.httpClient.post<Conversa>(environment.url_back + '/conversas/', conversa)
    }

    // listar(params: HttpParams = new HttpParams()): Observable<Conversa[]> {
    //     return this.httpClient.get<Chat[]>(environment.url_back + '/chats/', { params: params })
    // }

    // pergunta(pergunta: Pergunta): Observable<any> {
    //     return this.httpClient.post<Pergunta>(environment.url_back + '/pergunta/', pergunta)
    // }

}
