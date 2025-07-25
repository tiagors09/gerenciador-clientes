import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
  ],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.scss'
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  nomeFiltro: string = '';
  cidadeFiltro: string = '';
  paginaAtual = 0;
  itensPorPagina = 6;

  constructor(private clienteService: ClienteService) {}

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
    this.clienteService.remover(cliente.id);
  }
}
