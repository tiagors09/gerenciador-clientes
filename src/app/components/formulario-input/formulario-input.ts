import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputMask } from "primeng/inputmask";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-formulario-input',
  imports: [
    InputMask,
    InputTextModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormularioInput),
      multi: true,
    }
  ],
  templateUrl: './formulario-input.html',
  styleUrls: ['./formulario-input.scss']
})
export class FormularioInput implements ControlValueAccessor {
  @Input() mask!: string;
  @Input() placeholder!: string;
  @Input() type!: string;
  @Input() label!: string;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onInput(event: Event) {
    const value = (event?.target as HTMLInputElement).value;
    this.onChange(value);
  }
}
