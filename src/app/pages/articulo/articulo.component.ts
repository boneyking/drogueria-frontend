import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    const decoded = jwt_decode(localStorage.getItem('token'));
    console.log(decoded);

  }
}
