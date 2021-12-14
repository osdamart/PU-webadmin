import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Producto} from '../modelos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  url: string = "https://parrilladauru.pythonanywhere.com/api/";

  getData(){
    return this.http.get(this.url+'/productos/');
  }

  getProductoById(id: string){
    return this.http.get(this.url+`/productos/${id}/`);
  }

  saveProducto(producto:Producto){
    return this.http.post(this.url+`/productos/`, producto);
  }

  deleteProducto(id: string){
    return this.http.delete(this.url+`/productos/${id}/`);
  }

  updateProducto(id: string|number , updateProducto:Producto){
    return this.http.put(this.url+`/productos/${id}/`, updateProducto);
  }

}
