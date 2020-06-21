import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Validadores } from 'src/app/utils/validadores';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RespuestaLogin } from 'src/app/models/respuesta-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.usuarioYaLogueado();
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formulario = this.formBuilder.group({
      rut: new FormControl(null, [Validators.required, Validadores.rutValido]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  usuarioYaLogueado() {
    if (this.authService.logueado()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    const rut = this.formulario.controls.rut.value;
    const password = this.formulario.controls.password.value;

    try {
      this.authService
        .iniciarSesion(rut, password)
        .then((res: RespuestaLogin) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
