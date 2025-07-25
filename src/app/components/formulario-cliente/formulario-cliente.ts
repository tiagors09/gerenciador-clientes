import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from "primeng/button";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { FormularioInput } from "../formulario-input/formulario-input";

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [
    Dialog,
    Button,
    InputMaskModule,
    FormularioInput
],
  templateUrl: './formulario-cliente.html',
  styleUrl: './formulario-cliente.scss'
})
export class FormularioCliente {
  public visible: boolean = false;
  public form!: FormGroup;

  constructor() {
    this.form = new FormGroup(
      {
        name: new FormControl(
          '',
          [
            Validators.required,
          ]
        ),
        email: new FormControl(
          '',
          [
            Validators.required,
            Validators.email,
          ]
        ),
        cpf: new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
          ]
        ),
        birthday: new FormControl(
          '',
          [
            Validators.required,
          ]
        ),
        contact: new FormControl(
          '',
          [
            Validators.required,
          ]
        ),
        country: new FormControl(
          '',
          [
            Validators.required,
          ]
        ),
        state: new FormControl(
          '',
          [
            Validators.required,
          ]
        )
      }
    );
  }

  public toogleVisibility() {
    this.visible = !this.visible;
  }
}
