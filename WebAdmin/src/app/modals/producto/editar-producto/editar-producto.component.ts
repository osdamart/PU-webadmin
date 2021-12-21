import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  rol:number=this.data.idRol;
  imgFile: File = null;
  imgUrl:string=this.data.imagen;
  changed:boolean=false;
  

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
    nombre:[this.data.nombre,[Validators.required,]],
    descripcion:[this.data.descripcion,[Validators.required,]],
    precio:[this.data.precio,[Validators.required,Validators.pattern("^[0-9]*[.]?[0-9]*$"),]],
    imagen:[""],
    visible:[this.data.visible],
    idtipoproducto:[this.rol],

  })

  constructor(private productoService:ProductoService,
    public dialogRef:MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit(): void {
    
  }

  onImageChanged(event: any){
    if(event.target.files){
      this.changed=true;
      const reader = new FileReader();
      console.log(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any)=>{
        this.imgUrl = event.target.result;
      }
      this.form.value.imagen = event.target.files[0];
      this.imgFile = <File>event.target.files[0];
    }
    
  }

  actualizarProducto(){
    console.log(this.form.value)

    if(this.form.valid){
      if(this.changed){
        const uploadData:any = new FormData();
        uploadData.append('nombre', this.form.value.nombre);
        uploadData.append('descripcion', this.form.value.descripcion);
        uploadData.append('precio', this.form.value.precio);
        uploadData.append('imagen', this.imgFile, this.imgFile.name);
        uploadData.append('visible', this.form.value.visible);
        uploadData.append('idtipoproducto', this.form.value.idtipoproducto);
        
        this.productoService.updateProducto(this.data.idproducto,uploadData).subscribe(
          res => {
            console.log(res);
            this.closeDialog();
            this.toastr.success("Se ha actualizado el producto satisfactoriamente")
          },
          err =>{
            console.error(err)
            this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
          } 
        )
      }else{
        console.log("editar sin cambio de imagen")
  
        const uploadData:any = new FormData();
        uploadData.append('nombre', this.form.value.nombre);
        uploadData.append('descripcion', this.form.value.descripcion);
        uploadData.append('precio', this.form.value.precio);
        uploadData.append('visible', this.form.value.visible);
        uploadData.append('idtipoproducto', this.form.value.idtipoproducto);
        
        this.productoService.updateProducto(this.data.idproducto, uploadData).subscribe(
          res => {
            console.log(res);
            this.closeDialog();
            this.toastr.success("Se ha actualizado el producto satisfactoriamente")
          },
          err =>{
            console.error(err);
            this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
          } 
        )
      }
    }else{
      this.toastr.warning("Asegurese de enviar los campos tal como se solicita"); 
    }
    

    
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
