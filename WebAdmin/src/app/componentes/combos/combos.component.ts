import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service';


@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css']
})
export class CombosComponent implements OnInit {

  productos: any =[];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
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
