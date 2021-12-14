import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import{ Producto } from '../../modelos/productos';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { CrearProductoComponent } from 'src/app/modals/producto/crear-producto/crear-producto.component';
import { EliminarProductoComponent } from 'src/app/modals/producto/eliminar-producto/eliminar-producto.component';
import { EditarProductoComponent } from 'src/app/modals/producto/editar-producto/editar-producto.component';


@Component({
  selector: 'app-principales',
  templateUrl: './principales.component.html',
  styleUrls: ['./principales.component.css']
})
export class PrincipalesComponent implements OnInit {

  productos: Producto[] =[];


  constructor(private productoService: ProductoService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(){
    this.productoService.getData().subscribe(data =>{
      for (const [key,value] of Object.entries(data)) {
        if ( value.idtipoproducto === 1){
          this.productos.push(value);
        }
      }

      //console.log(this.productos);
    });
  }

  eliminarProducto(id: string){
    this.productoService.deleteProducto(id).subscribe(
      res => {
        console.log(res);
        this.obtenerProducto();
      },
      err => console.error(err)
    )
  }



  createDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(CrearProductoComponent,{
      data:{idRol:1}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  editDialog(idproducto:number, nombre:string, descripcion:string, precio:number, imagen:string, visible:number ){
    
    this.dialog.open(EditarProductoComponent,{
      data: {idRol:1,idproducto:idproducto,nombre:nombre,descripcion:descripcion,precio:precio,imagen:imagen,visible:visible}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  deleteDialog(idproducto:number, nombre:string){
    this.dialog.open(EliminarProductoComponent,{
      data: {idproducto:idproducto, nombre:nombre}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  refresh(): void {
    this.productos=[];
    if(this.productos.length==0){
      this.obtenerProducto();
    }
  }

}
