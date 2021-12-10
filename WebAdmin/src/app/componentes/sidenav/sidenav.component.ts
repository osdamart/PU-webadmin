import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit, OnInit{

  @ViewChild(MatSidenav)
    sidenav!: MatSidenav;

  @ViewChild("selectedOpt") selectedOpt;
  @ViewChild("selectedSubOpt") selectedSubOpt;

  menuList: any;
  selected: any;
  subselected: any;
  
  constructor(private observer: BreakpointObserver,){
    this.menuList = [
      {
        name:"Usuarios",
        route:"",
        icon: "supervisor_account",
        subMenu: [
          {
            name:"Clientes",
            route:"usuarios",
          } , {
            name:"Administradores",
            route:"administradores",
          }
        ]
      },
      {
        name: "Nuestros Platos",
        route: "productos",
        icon: "fastfood",
        subMenu: [
          {
            name:"Combos",
            route:"combos",
          },
          {
            name:"Principales",
            route:"principales",
          },
          {
            name:"Adicionales",
            route:"adicionales",
          },
          {
            name:"Bebidas",
            route:"bebidas",
          },
        ]
      },
      {
        name: "Pedidos",
        route:"#",
        icon:"assignment",
        subMenu: []
      },
      {
        name: "Reclamos y sugerencias",
        route:"#",
        icon:"comment",
        subMenu: []
      },
      {
        name: "Notificaciones Push",
        route:"#",
        icon:"notifications",
        subMenu: []
      },
      {
        name: "Configuración",
        route:"#",
        icon:"settings",
        subMenu: []
      },
    ];
  }

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

  onChange(e) {
    this.selected =
      this.selected === e.selectedOptions.selected[0].value
        ? null
        : e.selectedOptions.selected[0].value;
    if (!this.selected) {
      e.deselectAll();
    }
  }

  onSubChange(sub) {
    this.subselected =
      this.subselected === sub.selectedOptions.selected[0].value
        ? null
        : sub.selectedOptions.selected[0].value;
    if (!this.subselected) {
      sub.deselectAll();
    }
  }


  title = 'projectoPU';
  showFiller = false;
  

  

  ngOnInit(){
    
  }

  ngAfterViewInit(){

    //aqui agregue el setTimeout para manejar el cambio asincronicamente y evitar el error que daba
    setTimeout(()=>{
      this.observer.observe(['(max-width: 800px']).subscribe((res)=>{
        if (res.matches){
          this.sidenav.mode='over';
          this.sidenav.close();
        }else{
          this.sidenav.mode='side';
          this.sidenav.open();
        }
      });
    },0)
    
    

  }





}
