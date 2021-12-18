import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Oferta} from '../modelos/ofertas';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private http: HttpClient) { }
  url: string = "https://parrilladauru.pythonanywhere.com/api/";

  getData(){
    return this.http.get(this.url+'ofertas/');
  }

  getOfertaById(id: string){
    return this.http.get(this.url+`ofertas/${id}/`);
  }

  saveOferta(oferta:Oferta){
    return this.http.post(this.url+`ofertas/`, oferta);
  }

  deleteOferta(id: string){
    return this.http.delete(this.url+`ofertas/${id}/`);
  }

  updateOferta(id: string|number , updateOferta:Oferta){
    return this.http.put(this.url+`ofertas/${id}/`, updateOferta);
  }

}