import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FormularioInputComponent } from '../formulario-input/formulario-input';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    FormularioInputComponent
  ],
  templateUrl: './formulario-cliente.html',
  styleUrls: ['./formulario-cliente.scss']
})
export class FormularioClienteComponent implements OnChanges {
  @Input() cliente: any | null = null;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() salvar = new EventEmitter<any>();

  form: FormGroup;
  titulo: string = 'Novo Cliente';

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cliente']) {
      if (this.cliente) {
        this.titulo = 'Editar Cliente';
        this.form.patchValue({
          name: this.cliente.name,
          email: this.cliente.email,
          cpf: this.cliente.cpf,
          birthday: this.cliente.birthday,
          contact: this.cliente.contact,
          country: this.cliente.country,
          state: this.cliente.state
        });
      } else {
        this.titulo = 'Novo Cliente';
        this.form.reset();
      }
    }

    if (changes['visible'] && !this.visible) {
      this.form.reset();
      this.titulo = 'Novo Cliente';
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.salvar.emit(this.form.value);
      this.visible = false;
      this.visibleChange.emit(false);
      this.form.reset();
      this.titulo = 'Novo Cliente';
    }
  }

  private dataFuturaValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      const hoje = new Date();
      const data = new Date(control.value);
      return data > hoje ? { dataFutura: true } : null;
    };
  }
}
