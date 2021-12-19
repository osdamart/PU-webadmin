import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { OfertaProductoService } from 'src/app/services/oferta-producto';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/modelos/productos';



@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css']
})
export class EditarOfertaComponent implements OnInit {

  //inicializo lista para los nombres de los productos
  asignables: Producto[]=[];
  idoferta = this.data.idoferta;
  //idproducto: number;


  form: FormGroup = this.fb.group({
    idproducto:[0],
  })

  constructor(private productoService:ProductoService,
    private ofertaProductoService:OfertaProductoService,
    public dialogRef:MatDialogRef<EditarOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.obtenerProductoNombres();
  }

  obtenerProductoNombres(){
    this.productoService.getData().subscribe(data =>{
      for (const [key, value] of Object.entries(data)) {
        if (value.idtipoproducto === 1 || value.idtipoproducto === 4){
          this.asignables.push(value);
        } 
      }console.log(this.asignables);
    });
  }

  guardarOfertaMatch(){

    const uploadData:any = new FormData();
    uploadData.append('idoferta',this.idoferta);
    uploadData.append('idproducto',this.form.value.idproducto);
    console.log(this.idoferta);
    console.log(this.form.value.idproducto);
    console.log(uploadData);

    this.ofertaProductoService.saveOfertaProducto(uploadData).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.toastr.success("Se ha agregado el match satisfactoriamente")
      }
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
