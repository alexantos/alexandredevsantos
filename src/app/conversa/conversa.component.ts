import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chat, Conversa, Paginacao, Pergunta } from '../models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { ConversaService } from '../conversa.service';
import { HttpParams } from '@angular/common/http';



@Component({
    selector: 'app-conversa',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NgFor,
    ],
    templateUrl: './conversa.component.html',
    styleUrl: './conversa.component.css'
})
export class ConversaComponent implements OnInit {

    chats: Chat[] = [];

    pergunta_input: FormControl = new FormControl('');

    conversa_id: string = ''

    constructor(private chatService: ChatService, private conversaService: ConversaService) { }

    ngOnInit(): void {
        this.conversa_id = localStorage.getItem('conversa') || '';
        console.log('conversa id: ', localStorage.getItem('conversa'))
        if (this.conversa_id) {
            this.listarChat();
        } else {
            this.criaConversa();
        }
    }

    listarChat() {
        let params = new HttpParams().set('conversa', this.conversa_id)
        this.chatService.listar(params).subscribe({
            next: (resultado: Paginacao<Chat>) => {
                this.chats = resultado.results;
            }
        });
    }

    criaConversa() {
        this.conversaService.criar().subscribe({
            next: (resultado: Conversa) => {
                localStorage.setItem('conversa', resultado.id)
                this.listarChat();
            }
        })
    }

    perguntar(): void {
        console.log('Pergunta', this.pergunta_input.value)
        let pergunta: Pergunta = {
            id_conversa: this.conversa_id,
            pergunta: this.pergunta_input.value
        }
        this.pergunta_input.setValue('');
        this.chatService.pergunta(pergunta).subscribe({
            next: (resultado: Chat) => {
                console.log('Chat', resultado)
                this.chats.unshift(resultado);
                // this.chats = resultado;
            }
        });
    }

}
