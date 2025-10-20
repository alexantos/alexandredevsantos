import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat, Pergunta } from './models';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private httpClient: HttpClient) { }

    listar(params: HttpParams = new HttpParams()): Observable<Chat[]> {
        return this.httpClient.get<Chat[]>(environment.url_back + '/chats/', { params: params })
    }

    pergunta(pergunta: Pergunta): Observable<any> {
        return this.httpClient.post<Pergunta>(environment.url_back + '/pergunta/', pergunta)
    }

}
