import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputMask } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-formulario-input',
  templateUrl: './formulario-input.html',
  imports: [
    InputMask,
    InputTextModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormularioInputComponent),
      multi: true,
    },
  ],
})
export class FormularioInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() mask?: string;

  value: any;
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: any) {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
