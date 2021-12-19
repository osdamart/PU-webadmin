import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/services/oferta.service';
import { Oferta } from 'src/app/modelos/ofertas';
import { MatDialog } from '@angular/material/dialog';
import { CrearOfertaComponent } from 'src/app/modals/oferta/crear-oferta/crear-oferta.component';
import { EliminarOfertaComponent } from 'src/app/modals/oferta/eliminar-oferta/eliminar-oferta.component';
import { EditarOfertaComponent } from 'src/app/modals/oferta/editar-oferta/editar-oferta.component';
import { AsignarOfertaComponent } from 'src/app/modals/oferta/asignar-oferta/asignar-oferta.component';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  ofertas: Oferta[]=[];

  constructor(private ofertaService: OfertaService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.obtenerOferta();
  }

  obtenerOferta(){
    this.ofertaService.getData().subscribe(data=>{
      for (const [key,value] of Object.entries(data)){
        this.ofertas.push(value);
      }//console.log(this.ofertas);
    })
  }

  createDialog(){

    this.dialog.open(CrearOfertaComponent,{
      data:{}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  asignDialog(idoferta:number, nombre:string){
    this.dialog.open(AsignarOfertaComponent,{
      data: {idoferta:idoferta, nombre:nombre}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    })
  }

  deleteDialog(idoferta:number, nombre:string){
    this.dialog.open(EliminarOfertaComponent,{
      data: {idoferta:idoferta, nombre:nombre}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  refresh(): void {
    this.ofertas=[];
    if(this.ofertas.length==0){
      this.obtenerOferta();
    }
  }

}
