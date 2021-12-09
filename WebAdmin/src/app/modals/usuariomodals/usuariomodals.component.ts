import { Component, OnInit,Inject } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import {Router, ActivatedRoute} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usuariomodals',
  templateUrl: './usuariomodals.component.html',
  styleUrls: ['./usuariomodals.component.css']
})
export class UsuariomodalsComponent implements OnInit {

  usuario: any = {
    idrolusuario: 0,
    ide_card: '',
    cell_phone: '',
    name: '',
    email: '',
    password: '',
    fechanac: new Date(),
    status: 0,
    
  };

  edit: boolean = false;

  constructor(private usuarioService:UsuarioService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    public dialogRef: MatDialogRef<UsuariomodalsComponent>) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
      if(params.id) {
        this.usuarioService.getdatabyId(params.id).subscribe(
          res => {
            console.log(res);
            this.usuario = res;
            this.edit = true;
          },
          err => console.error(err)
        )
      }
  }

  guardarUsuario(){
    console.log(this.usuario)
    this.usuarioService.saveUsuario(this.usuario).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.refresh();
      },
      err => console.error(err)
    )
  }

  actualizarUsuario(){
    this.usuarioService.updateUsuario(this.usuario.id,this.usuario).subscribe(
      res => {      
        console.log(res);
        this.closeDialog();  
        this.router.navigate(['/sidenav/usuarios']);
      },
      err => console.error(err)
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }
  
  refresh(): void {
    window.location.reload();
  }

}
