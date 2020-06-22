import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule],
	exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule],
})
export class MaterialModule {}
