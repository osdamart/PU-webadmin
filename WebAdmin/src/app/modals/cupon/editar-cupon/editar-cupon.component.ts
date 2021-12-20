import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuponService } from 'src/app/services/cupon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar-cupon',
  templateUrl: './editar-cupon.component.html',
  styleUrls: ['./editar-cupon.component.css']
})
export class EditarCuponComponent implements OnInit {

  imgUrl:string=this.data.imagen;
  changed:boolean=false;

  get nombre(){
    return this.form.get('nombre')
  }

  get descripcion(){
    return this.form.get('descripcion')
  }

  get descuento(){
    return this.form.get('descuento')
  }

  get imagen(){
    return this.form.get('imagen')
  }

  get cantidad(){
    return this.form.get('cantidad')
  }

  get preciominimo(){
    return this.form.get('preciominimo')
  }

  get limitediario(){
    return this.form.get('limitediario')
  }

  get visible(){
    return this.form.get('visible')
  }

  get fechainicio(){
    return this.form.get('fechainicio')
  }

  get fechafin(){
    return this.form.get('fechafin')
  }

  get idtipocupon(){
    return this.form.get('idtipocupon')
  }

  form: FormGroup = this.fb.group({
    cantidad:[this.data.cantidad,[Validators.required,]],
    nombre:[this.data.nombre,[Validators.required,]],
    descripcion:[this.data.descripcion,[Validators.required,]],
    descuento:[this.data.descuento,],
    imagen:['',],
    visible:[this.data.visible],
    limitediario:[this.data.limitediario,],
    preciominimo:[this.data.preciominimo,],
    fechainicio:[this.data.fechainicio,[Validators.required,]],
    fechafin:[this.data.fechafin,[Validators.required,]],
    idtipocupon:[1],

  })

  constructor(private cuponService:CuponService,
    public dialogRef:MatDialogRef<EditarCuponComponent>,
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
      console.log(event);
    }
    
  }

  actualizarCupon(){
    console.log(this.form.value)

    if(this.form.valid){
      if(this.changed){
        const uploadData:any = new FormData();
        uploadData.append('cantidad', this.form.value.cantidad);
      uploadData.append('nombre', this.form.value.nombre);
      uploadData.append('descripcion', this.form.value.descripcion);
      uploadData.append('descuento', this.form.value.descuento);
      uploadData.append('imagen', this.form.value.imagen, this.form.value.imagen.name);
      uploadData.append('visible', this.form.value.visible);
      uploadData.append('idtipocupon', this.form.value.idtipocupon);
      uploadData.append('limitediario', this.form.value.limitediario);
      uploadData.append('preciominimo', this.form.value.preciominimo);
      uploadData.append('fechainicio',this.form.value.fechainicio);
      uploadData.append('fechafin',this.form.value.fechafin);
        
        this.cuponService.updateCupon(this.data.idcupon,uploadData).subscribe(
          res => {
            console.log(res);
            this.closeDialog();
            this.toastr.success("Se ha actualizado el cupon satisfactoriamente")
          },
          err =>{
            console.error(err)
            this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
          } 
        )
      }else{
        console.log("editar sin cambio de imagen")
  
        const uploadData:any = new FormData();
        uploadData.append('cantidad', this.form.value.cantidad);
      uploadData.append('nombre', this.form.value.nombre);
      uploadData.append('descripcion', this.form.value.descripcion);
      uploadData.append('descuento', this.form.value.descuento);
      uploadData.append('visible', this.form.value.visible);
      uploadData.append('idtipocupon', this.form.value.idtipocupon);
      uploadData.append('limitediario', this.form.value.limitediario);
      uploadData.append('preciominimo', this.form.value.preciominimo);
      uploadData.append('fechainicio',this.form.value.fechainicio);
      uploadData.append('fechafin',this.form.value.fechafin);
        
        this.cuponService.updateCupon(this.data.idcupon, uploadData).subscribe(
          res => {
            console.log(res);
            this.closeDialog();
            this.toastr.success("Se ha actualizado el cupon satisfactoriamente")
          },
          err =>{
            console.error(err)
            this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
          } 
        )
      }
    }else{
      this.toastr.warning("Asegurese de enviar todos los campos requeridos"); 
    }
    

    
  }


  closeDialog(){
    this.dialogRef.close();
  }

}
