import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Cupon} from '../modelos/cupones';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  constructor(private http: HttpClient) { }
  url: string = "https://parrilladauru.pythonanywhere.com/api/";

  getData(){
    return this.http.get(this.url+'cupones/');
  }

  getCuponById(id: string){
    return this.http.get(this.url+`cupones/${id}/`);
  }

  saveCupon(cupon:Cupon){
    return this.http.post(this.url+`cupones/`, cupon);
  }

  deleteCupon(id: string){
    return this.http.delete(this.url+`cupones/${id}/`);
  }

  updateCupon(id: string|number , updateCupon:Cupon){
    return this.http.put(this.url+`cupones/${id}/`, updateCupon);
  }

}