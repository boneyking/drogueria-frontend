import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Validadores } from 'src/app/utils/validadores';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formulario: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void{
    this.formulario = this.formBuilder.group({
      rut: new FormControl(null, [Validators.required, Validadores.rutValido]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){}
}
