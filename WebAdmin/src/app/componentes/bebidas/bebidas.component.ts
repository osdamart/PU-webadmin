import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';
import{ Producto } from '../../modelos/productos';


@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.css']
})
export class BebidasComponent implements OnInit {

  productos: Producto[] =[];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(){
    this.productoService.getData().subscribe(data =>{
      for (const [key,value] of Object.entries(data)) {
        if ( value.idtipoproducto === 3){
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
