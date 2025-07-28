// src/app/components/formulario-cliente/formulario-cliente.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule
  ],
  templateUrl: './formulario-cliente.html',
  styleUrl: './formulario-cliente.scss'
})
export class FormularioClienteComponent {
  visible: boolean = false;
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      birthday: new FormControl('', [Validators.required, this.dataFuturaValidator()]),
      contact: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required])
    });

    this.form.get('country')?.valueChanges.subscribe(pais => {
      const cpfControl = this.form.get('cpf');
      if (pais?.toLowerCase() === 'brasil') {
        cpfControl?.setValidators([
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        ]);
      } else {
        cpfControl?.clearValidators();
      }
      cpfControl?.updateValueAndValidity();
    });
  }

  toggleVisibility() {
    this.visible = !this.visible;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Cliente salvo:', this.form.value);
      this.visible = false;
      this.form.reset();
    }
  }

  private dataFuturaValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const hoje = new Date();
      const data = new Date(control.value);
      return data > hoje ? { dataFutura: true } : null;
    };
  }
}
