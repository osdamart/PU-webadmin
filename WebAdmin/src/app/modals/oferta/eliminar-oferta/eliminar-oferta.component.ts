import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OfertaService } from 'src/app/services/oferta.service';

@Component({
  selector: 'app-eliminar-oferta',
  templateUrl: './eliminar-oferta.component.html',
  styleUrls: ['./eliminar-oferta.component.css']
})
export class EliminarOfertaComponent implements OnInit {

  constructor(private ofertaService:OfertaService,
    public dialogRef:MatDialogRef<EliminarOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  eliminarOferta(){
    this.ofertaService.deleteOferta(this.data.idoferta).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.toastr.success("Se ha eliminado "+this.data.nombre+" satisfactoriamente");

      },
      err=> {
        console.error(err);
      this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
      }
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
