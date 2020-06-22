import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { Theme } from './symbols';
import { takeUntil } from 'rxjs/operators';

@Directive({
	selector: '[appPtAbonadosTheme]',
})
export class ThemeDirective implements OnInit, OnDestroy {
	private destroy$ = new Subject();

	constructor(private elementRef: ElementRef, private themeService: ThemeService) {}

	ngOnInit() {
		const active = this.themeService.getActiveTheme();
		if (active) {
			this.updateTheme(active);
		}

		this.themeService.themeChange.pipe(takeUntil(this.destroy$)).subscribe((theme: Theme) => this.updateTheme(theme));
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	updateTheme(theme: Theme) {
		// project properties onto the element
		for (const key in theme.properties) {
			if (key) {
				// To do: cambiar esto, no ocupar ref
				this.elementRef.nativeElement.style.setProperty(key, theme.properties[key]);
			}
		}

		// remove old theme
		for (const name of this.themeService.theme) {
			this.elementRef.nativeElement.classList.remove(`${name}-theme`);
		}

		// alias element with theme name
		this.elementRef.nativeElement.classList.add(`${theme.name}-theme`);
	}
}
