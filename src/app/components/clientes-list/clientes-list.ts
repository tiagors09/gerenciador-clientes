import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormularioClienteComponent } from '../formulario-cliente/formulario-cliente';
import { MessageService } from 'primeng/api';
import { ClienteService } from '../../services/cliente-service';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    FormularioClienteComponent,
  ],
  providers: [MessageService,],
  templateUrl: './clientes-list.html',
  styleUrls: ['./clientes-list.scss']
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  nomeFiltro: string = '';
  cidadeFiltro: string = '';
  paginaAtual = 0;
  itensPorPagina = 6;

  formVisible = false;
  clienteSelecionado: Cliente | null = null;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  aplicarFiltro() {
    this.clienteService.filtrar(this.nomeFiltro, this.cidadeFiltro);
    this.paginaAtual = 0;
  }

  aoPaginar(event: any) {
    this.paginaAtual = event.first;
  }

  remover(cliente: Cliente) {
    if (cliente.id && confirm('Deseja realmente remover este cliente?')) {
      this.clienteService.remover(cliente.id);
    }
  }

  abrirFormulario(cliente?: Cliente) {
    if (cliente) {
      this.clienteSelecionado = { ...cliente };
    } else {
      this.clienteSelecionado = null;
    }
    this.formVisible = true;
  }

  salvarCliente(cliente: Cliente) {
    this.clienteService.adicionar(cliente);
    this.formVisible = false;
  }
}
