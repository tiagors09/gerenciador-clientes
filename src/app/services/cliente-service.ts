import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../models/cliente';


@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  private todosClientes: Cliente[] = []; // armazena tudo

  constructor() {
    // mock de dados iniciais
    this.todosClientes = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      nome: `Cliente ${i + 1}`,
      email: `cliente${i + 1}@teste.com`,
      cpf: '000.000.000-00',
      cidade: i % 2 === 0 ? 'Fortaleza' : 'Juazeiro',
      estado: 'CE',
    }));
    this.clientesSubject.next(this.todosClientes);
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientesSubject.asObservable();
  }

  filtrar(nome: string, cidade: string) {
    const filtrados = this.todosClientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(nome.toLowerCase()) &&
      cliente.cidade.toLowerCase().includes(cidade.toLowerCase())
    );
    this.clientesSubject.next(filtrados);
  }

  remover(id: number) {
    this.todosClientes = this.todosClientes.filter(c => c.id !== id);
    this.clientesSubject.next(this.todosClientes);
  }

  adicionar(cliente: Cliente) {
    this.todosClientes.push(cliente);
    this.clientesSubject.next(this.todosClientes);
  }
}
