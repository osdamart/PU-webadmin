import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
import { Cupon } from 'src/app/modelos/cupones';
import { MatDialog } from '@angular/material/dialog';
import { CrearCuponComponent } from 'src/app/modals/cupon/crear-cupon/crear-cupon.component';
import { EliminarCuponComponent } from 'src/app/modals/cupon/eliminar-cupon/eliminar-cupon.component';
import { EditarCuponComponent } from 'src/app/modals/cupon/editar-cupon/editar-cupon.component';
import { AsignarCuponComponent } from 'src/app/modals/cupon/asignar-cupon/asignar-cupon.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css']
})
export class CuponesComponent implements OnInit {

  cupones: Cupon[]=[];
  loading: boolean=true;

  constructor(private cuponService: CuponService,
    private dialog: MatDialog, private toastr: ToastrService,) { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.checkDates();

    },1000)

    this.obtenerCupon();


  }

  obtenerCupon(){
    this.cuponService.getData().subscribe(data=>{
      for (const [key,value] of Object.entries(data)){
        this.cupones.push(value);
      }//console.log(this.cupones);
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

  asignDialog(idcupon:number, nombre:string){
    this.dialog.open(AsignarCuponComponent,{
      data: {idcupon:idcupon, nombre:nombre}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    })
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

  checkDates(){
    for(let cupon of this.cupones){
      const fechainicio = cupon.fechainicio;
      const fechafin = cupon.fechafin;
      const fecha = new Date();
      //const fechahoy = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate();

      const cantidad = cupon.cantidad;

      var verNo=0;
      var verSi=0;

      //logica para determinar si el día de hoy se esta dentro del rango de fechas o si se acabo la cantidad de cupones
      if( (new Date(fechainicio).getTime() > fecha.getTime() || new Date(fechafin).getTime() < fecha.getTime() ) || cantidad<=0){
        console.log("ESTE PRINT SIGNIFICA QUE EL DIA DE HOY NO ESTA DENTRO DE LAS FECHAS ESTABLECIDAS O EL CUPON QUEDO SIN STOCK");
        if (verNo==0){
          const uploadData:any = new FormData();
          uploadData.append('nombre', cupon.nombre);
          uploadData.append('descripcion', cupon.descripcion);
          uploadData.append('fechainicio', cupon.fechainicio);
          uploadData.append('fechafin', cupon.fechafin);
          uploadData.append('estado', 0); //CADUCADO
          uploadData.append('idtipocupon',cupon.idtipocupon);
  
          this.cuponService.updateCupon(cupon.idcupon,uploadData).subscribe(
            res => {
              console.log(res);
              this.toastr.warning("El cupon "+cupon.nombre+" ha caducado");
              
            },
            err =>{
              console.error(err)
              this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
            } 
          )
          verNo=1;

          
        }
        verSi=0;

        


      }else{
        console.log("AQUI SI ESTOY EN EL RANGO PERMITIDO Y LA CANTIDAD ES MAYOR A 0");

        if (verSi==0){
          const uploadData:any = new FormData();
          uploadData.append('nombre', cupon.nombre);
          uploadData.append('descripcion', cupon.descripcion);
          uploadData.append('fechainicio', cupon.fechainicio);
          uploadData.append('fechafin', cupon.fechafin);
          uploadData.append('estado', 1); //RESTABLECIDO
          uploadData.append('idtipocupon',cupon.idtipocupon);
  
          this.cuponService.updateCupon(cupon.idcupon,uploadData).subscribe(
            res => {
              console.log(res);
              //this.toastr.success("El cupon "+cupon.nombre+" ha sido reestablecido")
              verSi=1;
            },
            err =>{
              console.error(err)
              this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
            } 
          )
        }
        verNo=0;

        
      }
      
    }this.refresh();
    
    
  }




}
