import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
import { Cupon } from 'src/app/modelos/cupones';
import { MatDialog } from '@angular/material/dialog';
import { CrearCuponComponent } from 'src/app/modals/cupon/crear-cupon/crear-cupon.component';
import { EliminarCuponComponent } from 'src/app/modals/cupon/eliminar-cupon/eliminar-cupon.component';
import { EditarCuponComponent } from 'src/app/modals/cupon/editar-cupon/editar-cupon.component';
import { AsignarCuponComponent } from 'src/app/modals/cupon/asignar-cupon/asignar-cupon.component';


@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css']
})
export class CuponesComponent implements OnInit {

  cupones: Cupon[]=[];
  loading: boolean=true;

  constructor(private cuponService: CuponService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.obtenerCupon();
  }

  obtenerCupon(){
    this.cuponService.getData().subscribe(data=>{
      for (const [key,value] of Object.entries(data)){
        this.cupones.push(value);
      }console.log(this.cupones);
    });this.loading=false;
  }

  createDialog(){
    this.dialog.open(CrearCuponComponent,{
      data:{}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  editDialog(idcupon:number,nombre:string,descripcion:string,descuento:number,imagen:string,visible:number,fechainicio:string,fechafin:string,limitediario:number,cantidad:number,preciominimo:number){
    this.dialog.open(EditarCuponComponent,{
      data:{idcupon:idcupon,nombre:nombre,descripcion:descripcion,descuento:descuento,imagen:imagen,visible:visible,fechainicio:fechainicio,fechafin:fechafin,limitediario:limitediario,cantidad:cantidad,preciominimo:preciominimo}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }


  deleteDialog(idcupon:number, nombre:string){
    this.dialog.open(EliminarCuponComponent,{
      data: {idcupon:idcupon, nombre:nombre}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  refresh(): void {
    this.loading=true;
    this.cupones=[];

    setTimeout(()=>{
      if(this.cupones.length==0){
        this.obtenerCupon();
      }
    },500)
    
  }

}
