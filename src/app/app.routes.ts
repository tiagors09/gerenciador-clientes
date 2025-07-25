import { Routes } from '@angular/router';
import { FormularioCliente } from './components/formulario-cliente/formulario-cliente';
import { ClientesListComponent } from './components/clientes-list/clientes-list';

export const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesListComponent,
  }
];
