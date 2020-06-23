import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
	@Input() formulario: FormGroup;
	@Input() nombreCampo: string;
	@Input() placeholder: string;
	@Input() etiqueta: string;
	@Input() hint: string;
	constructor() {}

	ngOnInit(): void {}
}
