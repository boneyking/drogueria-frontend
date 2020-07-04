import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

export class AppDateAdapter extends NativeDateAdapter {
	parse(value: any): Date | null {
		if (typeof value === 'string') {
			if (value.indexOf('/') > -1) {
				const str = value.split('/');
				const year = Number(str[2]);
				const month = Number(str[1]) - 1;
				const date = Number(str[0]);
				return new Date(year, month, date);
			} else if (value.indexOf('-') > -1) {
				const str = value.split('-');
				const year = Number(str[2]);
				const month = Number(str[1]) - 1;
				const date = Number(str[0]);
				return new Date(year, month, date);
			}
		}

		const timestamp = typeof value === 'number' ? value : Date.parse(value);
		return isNaN(timestamp) ? null : new Date(timestamp);
	}
	format(date: Date, displayFormat: string): string {
		if (displayFormat === 'input') {
			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
		} else if (displayFormat === 'inputMonth') {
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return this._to2digit(month) + '/' + year;
		} else {
			return date.toDateString();
		}
	}

	private _to2digit(n: number) {
		return ('00' + n).slice(-2);
	}
}

export const APP_DATE_FORMATS = {
	parse: {
		dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
	},
	display: {
		dateInput: 'input',
		monthYearLabel: 'inputMonth',
		dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
		monthYearA11yLabel: { year: 'numeric', month: 'long' },
	},
};

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
	providers: [
		{
			provide: DateAdapter,
			useClass: AppDateAdapter,
		},
		{
			provide: MAT_DATE_FORMATS,
			useValue: APP_DATE_FORMATS,
		},
	],
})
export class DatepickerComponent implements OnInit {
	@Input() formulario: FormGroup;
	@Input() nombreCampo: string;
	@Input() placeholder: string;
	@Input() etiqueta: string;
	@Input() hint: string;
	@Input() fechaMinima: Date;

	constructor() {}

	ngOnInit(): void {}
}
