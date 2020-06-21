import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefaultComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {

  }
}
