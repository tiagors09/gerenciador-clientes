import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  clientes$ = this.clientesSubject.asObservable();

  private apiUrl = 'http://localhost:3000/clientes'; // seu endpoint REST (JSON-server, por exemplo)

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.loadClientes();
  }

  private loadClientes() {
    this.http.get<Cliente[]>(this.apiUrl)
      .pipe(
        tap(clientes => this.clientesSubject.next(clientes)),
        catchError(err => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar clientes' });
          return of([]);
        })
      ).subscribe();
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientes$;
  }

  filtrar(nome: string, cidade: string) {
    this.http.get<Cliente[]>(this.apiUrl).subscribe(clientes => {
      const filtrados = clientes.filter(c =>
        c.nome.toLowerCase().includes(nome.toLowerCase()) &&
        c.cidade.toLowerCase().includes(cidade.toLowerCase())
      );
      this.clientesSubject.next(filtrados);
    });
  }

  remover(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente removido' });
        this.loadClientes();
      }),
      catchError(err => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover cliente' });
        return of(null);
      })
    ).subscribe();
  }

  adicionar(cliente: Cliente) {
    if (cliente.id) {
      // editar
      return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente).pipe(
        tap(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente atualizado' });
          this.loadClientes();
        }),
        catchError(err => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar cliente' });
          return of(null);
        })
      ).subscribe();
    } else {
      // novo cliente
      return this.http.post<Cliente>(this.apiUrl, cliente).pipe(
        tap(() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente adicionado' });
          this.loadClientes();
        }),
        catchError(err => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao adicionar cliente' });
          return of(null);
        })
      ).subscribe();
    }
  }
}
