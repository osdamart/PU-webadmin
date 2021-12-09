import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {UsuarioService} from '../../../services/usuario.service';


@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,
    public dialogRef:MatDialogRef<EliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  eliminarUsuario(){
    this.usuarioService.deleteUsuario(this.data.id).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.toastr.success("El usuario "+this.data.name+" ha sido eliminado con exito");

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
