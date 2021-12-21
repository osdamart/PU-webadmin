import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  imgFile: File = null;
  rol:number=this.data.idRol;

  get nombre(){
    return this.form.get('nombre')
  }

  get descripcion(){
    return this.form.get('descripcion')
  }

  get precio(){
    return this.form.get('precio')
  }

  get imagen(){
    return this.form.get('imagen')
  }

  get visible(){
    return this.form.get('visible')
  }

  get puntos(){
    return this.form.get('puntos')
  }

  get idtipoproducto(){
    return this.form.get('idtipoproducto')
  }

  form: FormGroup = this.fb.group({
    nombre:['',[Validators.required,]],
    descripcion:['',[Validators.required,]],
    precio:[0,[Validators.required,Validators.pattern("^[0-9]*[.]?[0-9]*$"),]],
    imagen:['',[Validators.required,]],
    visible:[1],
    puntos:[5],
    idtipoproducto:[this.rol],

  })

  constructor(private productoService:ProductoService,
    public dialogRef:MatDialogRef<CrearProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  onImageChanged(event: any){
      
    this.form.value.imagen = event.target.files[0];
    this.imgFile = <File>event.target.files[0];

  }

  guardarProducto(){
    console.log(this.form.value)
    if(this.form.valid){
      const uploadData:any = new FormData();
      uploadData.append('nombre', this.form.value.nombre);
      uploadData.append('descripcion', this.form.value.descripcion);
      uploadData.append('precio', this.form.value.precio);
      uploadData.append('imagen', this.imgFile, this.imgFile.name);
      uploadData.append('visible', this.form.value.visible);
      uploadData.append('idtipoproducto', this.form.value.idtipoproducto);
      uploadData.append('puntos',this.form.value.puntos);

    console.log(uploadData);

    this.productoService.saveProducto(uploadData).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.toastr.success("Se ha agregado el producto satisfactoriamente")
      },
      err=> {
        console.error(err);
      this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
      } 
    )
    }else{

      this.toastr.warning("Asegurese de enviar los campos tal como se solicita"); 
    }
    
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
