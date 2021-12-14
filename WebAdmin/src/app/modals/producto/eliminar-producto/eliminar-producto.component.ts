import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  constructor(private productoService:ProductoService,
    public dialogRef:MatDialogRef<EliminarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  eliminarProducto(){
    this.productoService.deleteProducto(this.data.idproducto).subscribe(
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
