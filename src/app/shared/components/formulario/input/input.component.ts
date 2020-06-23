import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
	@Input() formulario: FormGroup;
	@Input() nombreCampo: string;
	@Input() placeholder: string;
	@Input() tipoInput: string;
	@Input() etiqueta: string;
	@Input() hint: string;

	constructor() {}

	ngOnInit(): void {}
}
