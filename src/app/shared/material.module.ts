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
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';

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
		MatNativeDateModule,
		MatSelectModule,
		MatTableModule,
		MatPaginatorModule,
		MatAutocompleteModule,
		MatListModule,
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
		MatNativeDateModule,
		MatSelectModule,
		MatTableModule,
		MatPaginatorModule,
		MatAutocompleteModule,
		MatListModule,
	],
})
export class MaterialModule {}
