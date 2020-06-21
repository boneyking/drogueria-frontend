import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.logueado()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {}
}
