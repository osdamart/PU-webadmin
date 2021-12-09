import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {Usuario} from '../modelos/usuarios'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient:HttpClient) {

   }
  getData(){
    return this.httpClient.get('https://parrilladauru.pythonanywhere.com/api/list');
  }

  loginUsuario(usuario:any){
    return this.httpClient.post('https://parrilladauru.pythonanywhere.com/api/login',usuario, {withCredentials: true});
  }

  getUsuarioLogeado(){
  return this.httpClient.get('https://parrilladauru.pythonanywhere.com/api/user', {withCredentials: true});
  }

  logoutUsuario(){
    return this.httpClient.post('https://parrilladauru.pythonanywhere.com/api/logout',{}, {withCredentials: true});
  }

  getdatabyId(id: string){
    return this.httpClient.get(`https://parrilladauru.pythonanywhere.com/api/user-detail/${id}/`);
  }

  saveUsuario(usuario:Usuario){
    return this.httpClient.post('https://parrilladauru.pythonanywhere.com/api/register', usuario);
  }

  deleteUsuario(id: string){
    return this.httpClient.delete(`https://parrilladauru.pythonanywhere.com/api/user-delete/${id}/`);
  }
  
  updateUsuario(id: string|number , updatedUsuario: Usuario){
    return this.httpClient.put(`https://parrilladauru.pythonanywhere.com/api/user-update/${id}/`,updatedUsuario);
  }
}
