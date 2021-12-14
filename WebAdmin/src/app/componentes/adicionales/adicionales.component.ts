import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import{ Producto } from '../../modelos/productos';


@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.css']
})
export class AdicionalesComponent implements OnInit {

  productos: Producto[] =[];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(){
    this.productoService.getData().subscribe(data =>{
      for (const [key,value] of Object.entries(data)) {
        if ( value.idtipoproducto === 2){
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

}
