import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos:any =[];

  constructor(private productoService: ProductoService) { }

  ngOnInit(){
    this.obtenerProducto();
  }

  obtenerProducto(){
    this.productoService.getData().subscribe(data =>{
      this.productos = data;
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
