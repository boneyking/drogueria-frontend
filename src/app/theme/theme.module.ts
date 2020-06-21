import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './theme.service';
import { THEMES, ACTIVE_THEME, ThemeOptions } from './symbols';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule],
  providers: [ThemeService],
  exports: [LayoutDefaultComponent, CabeceraComponent, CuerpoComponent],
  declarations: [CabeceraComponent, LayoutDefaultComponent, CabeceraComponent, CuerpoComponent],
  entryComponents: [],
})
export class ThemeModule {
  static forRoot(options: ThemeOptions): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [
        {
          provide: THEMES,
          useValue: options.themes,
        },
        {
          provide: ACTIVE_THEME,
          useValue: options.active,
        },
      ],
    };
  }
}
