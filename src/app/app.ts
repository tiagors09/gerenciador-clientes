import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioCliente } from "./components/formulario-cliente/formulario-cliente";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioCliente],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gerenciador-clientes');
}
