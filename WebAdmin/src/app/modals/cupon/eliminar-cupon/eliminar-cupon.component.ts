import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CuponService } from 'src/app/services/cupon.service';


@Component({
  selector: 'app-eliminar-cupon',
  templateUrl: './eliminar-cupon.component.html',
  styleUrls: ['./eliminar-cupon.component.css']
})
export class EliminarCuponComponent implements OnInit {

  constructor(private cuponService:CuponService,
    public dialogRef:MatDialogRef<EliminarCuponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  eliminarCupon(){
    this.cuponService.deleteCupon(this.data.idcupon).subscribe(
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
