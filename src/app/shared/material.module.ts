import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
	imports: [
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatCardModule,
		MatStepperModule,
		MatGridListModule,
		MatDividerModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
	exports: [
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatCardModule,
		MatStepperModule,
		MatGridListModule,
		MatDividerModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
})
export class MaterialModule {}
