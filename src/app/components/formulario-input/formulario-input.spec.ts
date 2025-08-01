import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInput } from './formulario-input';

describe('FormularioInput', () => {
  let component: FormularioInput;
  let fixture: ComponentFixture<FormularioInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
