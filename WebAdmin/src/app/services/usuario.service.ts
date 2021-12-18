import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {Usuario} from '../modelos/usuarios'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient:HttpClient) { }

  url: string = "https://parrilladauru.pythonanywhere.com/api/";

  getData(){
    return this.httpClient.get(this.url+'list');
  }

  loginUsuario(usuario:any){
    return this.httpClient.post(this.url+'login',usuario, {withCredentials: true});
  }

  getUsuarioLogeado(){
  return this.httpClient.get(this.url+'user', {withCredentials: true});
  }

  logoutUsuario(){
    return this.httpClient.post(this.url+'logout',{}, {withCredentials: true});
  }

  getdatabyId(id: string){
    return this.httpClient.get(this.url+`user-detail/${id}/`);
  }

  saveUsuario(usuario:Usuario){
    return this.httpClient.post(this.url+'register', usuario);
  }

  deleteUsuario(id: string){
    return this.httpClient.delete(this.url+`user-delete/${id}/`);
  }
  
  updateUsuario(id: string|number , updatedUsuario: Usuario){
    return this.httpClient.put(this.url+`user-update/${id}/`,updatedUsuario);
  }
}
