import { AbstractControl } from '@angular/forms';
import { validate } from 'rut.js';

function rutValido(control: AbstractControl) {
  let respuesta = null;
  if (!validate(control.value)) {
    respuesta = { rutInvalido: true };
  }
  return respuesta;
}

export const Validadores = {
  rutValido,
};
