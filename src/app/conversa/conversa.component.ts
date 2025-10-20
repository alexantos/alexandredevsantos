import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chat, Conversa, Pergunta } from '../models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ConversaService } from '../conversa.service';
import { HttpParams } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@Component({
    selector: 'app-conversa',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        CommonModule,
        NgFor,
        NgIf,
    ],
    templateUrl: './conversa.component.html',
    styleUrl: './conversa.component.css'
})
export class ConversaComponent implements OnInit {

    chats: Chat[] = [];

    pergunta_input: FormControl = new FormControl('');

    conversa_id: string = ''

    aberto: boolean = false;

    carregando: boolean = false;

    constructor(private chatService: ChatService, private conversaService: ConversaService) { }

    ngOnInit(): void {
        this.conversa_id = localStorage.getItem('conversa') || '';
        if (this.conversa_id) {
            this.listarChat();
        } else {
            this.criaConversa();
        }
    }

    listarChat() {
        if (this.conversa_id) {
            let params = new HttpParams().set('conversa', this.conversa_id)
            this.chatService.listar(params).subscribe({
                next: (resultado: Chat[]) => {
                    if (resultado.length == 0) {
                        localStorage.removeItem('conversa');
                        this.criaConversa();
                    } else {
                        this.chats = resultado;
                    }
                }
            });
        }
    }

    criaConversa() {
        this.conversaService.criar().subscribe({
            next: (resultado: Conversa) => {
                localStorage.setItem('conversa', resultado.id)
                this.conversa_id = resultado.id
                this.listarChat();
            }
        })
    }

    perguntar(): void {
        this.carregando = true;
        let pergunta: Pergunta = {
            id_conversa: this.conversa_id,
            pergunta: this.pergunta_input.value
        }
        this.chats.unshift({ pergunta: this.pergunta_input.value, carregando: true } as any);
        this.pergunta_input.setValue('');
        this.chatService.pergunta(pergunta).subscribe({
            next: (resultado: Chat) => {
                this.chats.shift()
                this.chats.unshift(resultado);
                this.carregando = false;
            }
        });
    }

    abrirFechar() {
        this.aberto = !this.aberto;
    }

}
