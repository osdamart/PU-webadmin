import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { cuponProducto } from '../modelos/cupon-producto';

@Injectable({
  providedIn: 'root'
})
export class CuponProductoService {

  constructor(private http: HttpClient) { }
  url: string = "https://parrilladauru.pythonanywhere.com/api/";

  getData(){
    return this.http.get(this.url+'productocupones/');
  }

  getCuponProductoById(id: string){
    return this.http.get(this.url+`productocupones/${id}/`);
  }

  saveCuponProducto(cuponProducto:cuponProducto){
    return this.http.post(this.url+`productocupones/`, cuponProducto);
  }

  deleteCuponProducto(id: string){
    return this.http.delete(this.url+`productocupones/${id}/`);
  }

  updateCuponProducto(id: string|number , updateCuponProducto:cuponProducto){
    return this.http.put(this.url+`productocupones/${id}/`, updateCuponProducto);
  }

}