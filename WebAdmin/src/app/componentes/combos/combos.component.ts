import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import{ Producto } from '../../modelos/productos';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { CrearProductoComponent } from 'src/app/modals/producto/crear-producto/crear-producto.component';
import { EliminarProductoComponent } from 'src/app/modals/producto/eliminar-producto/eliminar-producto.component';
import { EditarProductoComponent } from 'src/app/modals/producto/editar-producto/editar-producto.component';


@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css']
})
export class CombosComponent implements OnInit {

  productos: Producto[] =[];

  constructor(private productoService: ProductoService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(){
    this.productoService.getData().subscribe(data =>{
      for (const [key,value] of Object.entries(data)) {
        if ( value.idtipoproducto === 4){
          this.productos.push(value);
        }
      }
    });
  }

  createDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(CrearProductoComponent,{
      data:{idRol:4}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  editDialog(idproducto:number, nombre:string, descripcion:string, precio:number, imagen:string, visible:number ){
    
    this.dialog.open(EditarProductoComponent,{
      data: {idRol:4,idproducto:idproducto,nombre:nombre,descripcion:descripcion,precio:precio,imagen:imagen,visible:visible}
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
