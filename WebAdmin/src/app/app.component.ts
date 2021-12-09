import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'projectoPU';
  showFiller = false;
  opciones = [
    {name: 'Dashboard', route: '', icon:'dashboard'},
    {name: 'Pedidos', route: '', icon:'assignment'},
    {name: 'Combos', route: 'combos', icon:'fastfood'},
    {name: 'Nuestros Platos', route: 'productos', icon:'food_bank'},
    {name: 'Reclamos y sugerencias', route: '', icon:'comment'},
    {name: 'Usuarios', route: 'usuarios', icon:'supervisor_account'},
    {name: 'Notificaciones Push', route: '', icon:'notifications'},
    {name: 'Administración', route: '', icon:'settings'},
  ]

}
