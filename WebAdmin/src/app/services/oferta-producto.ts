import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { ofertaProducto } from '../modelos/oferta-producto';

@Injectable({
  providedIn: 'root'
})
export class OfertaProductoService {

  constructor(private http: HttpClient) { }
  url: string = "https://parrilladauru.pythonanywhere.com/api/";

  getData(){
    return this.http.get(this.url+'productooferta/');
  }

  getOfertaProductoById(id: string){
    return this.http.get(this.url+`productooferta/${id}/`);
  }

  saveOfertaProducto(ofertaProducto:ofertaProducto){
    return this.http.post(this.url+`productooferta/`, ofertaProducto);
  }

  deleteOfertaProducto(id: string){
    return this.http.delete(this.url+`productooferta/${id}/`);
  }

  updateOfertaProducto(id: string|number , updateOfertaProducto:ofertaProducto){
    return this.http.put(this.url+`productooferta/${id}/`, updateOfertaProducto);
  }

}