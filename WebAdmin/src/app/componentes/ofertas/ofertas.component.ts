import { Component, OnInit } from '@angular/core';
import { OfertaService } from 'src/app/services/oferta.service';
import { Oferta } from 'src/app/modelos/ofertas';
import { MatDialog } from '@angular/material/dialog';
import { CrearOfertaComponent } from 'src/app/modals/oferta/crear-oferta/crear-oferta.component';
import { EliminarOfertaComponent } from 'src/app/modals/oferta/eliminar-oferta/eliminar-oferta.component';
import { EditarOfertaComponent } from 'src/app/modals/oferta/editar-oferta/editar-oferta.component';
import { AsignarOfertaComponent } from 'src/app/modals/oferta/asignar-oferta/asignar-oferta.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  ofertas: Oferta[]=[];
  loading: boolean=true;

  constructor(private ofertaService: OfertaService,
    private dialog: MatDialog, private toastr: ToastrService,) { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.checkDates();
    },1000)
    
    this.obtenerOferta();
  }

  obtenerOferta(){
    this.ofertaService.getData().subscribe(data=>{
      for (const [key,value] of Object.entries(data)){
        this.ofertas.push(value);
      }//console.log(this.ofertas);
    });this.loading=false;
  }

  createDialog(){

    this.dialog.open(CrearOfertaComponent,{
      data:{}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }
  
  editDialog(idoferta:number,nombre:string,descripcion:string,descuento:number,imagen:string,visible:number,fechainicio:string,fechafin:string){
    this.dialog.open(EditarOfertaComponent,{
      data:{idoferta:idoferta,nombre:nombre,descripcion:descripcion,descuento:descuento,imagen:imagen,visible:visible,fechainicio:fechainicio,fechafin:fechafin}
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
    this.loading=true;
    this.ofertas=[];

    setTimeout(()=>{
      if(this.ofertas.length==0){
        this.obtenerOferta();
      }
    },500)
    
  }

  checkDates(){
    for(let oferta of this.ofertas){
      const fechainicio = oferta.fechainicio;
      const fechafin = oferta.fechafin;
      const fecha = new Date();
      //const fechahoy = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate();

      var verNo=0;
      var verSi=0;

      //logica para determinar si el día de hoy se esta dentro del rango de fechas)
      if( new Date(fechainicio).getTime() > fecha.getTime() || new Date(fechafin).getTime() < fecha.getTime()){
        console.log("ESTE PRINT SIGNIFICA QUE EL DIA DE HOY NO ESTA DENTRO DE LAS FECHAS ESTABLECIDAS");
        if (verNo==0){
          const uploadData:any = new FormData();
          uploadData.append('nombre', oferta.nombre);
          uploadData.append('descripcion', oferta.descripcion);
          uploadData.append('estado', 0); //CADUCADO
          uploadData.append('idtipooferta',oferta.idtipooferta);
  
          this.ofertaService.updateOferta(oferta.idoferta,uploadData).subscribe(
            res => {
              console.log(res);
              this.toastr.warning("La oferta "+oferta.nombre+" ha caducado");
              
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
        console.log("AQUI SI ESTOY EN EL RANGO PERMITIDO");

        if (verSi==0){
          const uploadData:any = new FormData();
          uploadData.append('nombre', oferta.nombre);
          uploadData.append('descripcion', oferta.descripcion);
          uploadData.append('estado', 1); //RESTABLECIDO
          uploadData.append('idtipooferta',oferta.idtipooferta);
  
          this.ofertaService.updateOferta(oferta.idoferta,uploadData).subscribe(
            res => {
              console.log(res);
              //this.toastr.success("La oferta "+oferta.nombre+" ha sido reestablecida")
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
