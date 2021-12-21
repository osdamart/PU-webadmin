import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfertaService } from 'src/app/services/oferta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css']
})
export class EditarOfertaComponent implements OnInit {

  imgFile: File = null;
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

  get visible(){
    return this.form.get('visible')
  }

  get fechainicio(){
    return this.form.get('fechainicio')
  }

  get fechafin(){
    return this.form.get('fechafin')
  }

  get idtipooferta(){
    return this.form.get('idtipooferta')
  }



  form: FormGroup = this.fb.group({
    nombre:[this.data.nombre,[Validators.required,]],
    descripcion:[this.data.descripcion,[Validators.required,]],
    descuento:[this.data.descuento,[Validators.required,Validators.pattern("^[0-9]*[.]?[0-9]*$"),]],
    imagen:['',],
    visible:[this.data.visible],
    fechainicio:[this.data.fechainicio,[Validators.required,]],
    fechafin:[this.data.fechafin,[Validators.required,]],
    idtipooferta:[1],

  })

  constructor(private ofertaService:OfertaService,
    public dialogRef:MatDialogRef<EditarOfertaComponent>,
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

  actualizarOferta(){
    console.log(this.form.value)

    if(this.form.valid){
      if(this.changed){
        const uploadData:any = new FormData();
        uploadData.append('nombre', this.form.value.nombre);
        uploadData.append('descripcion', this.form.value.descripcion);
        uploadData.append('descuento', this.form.value.descuento);
        uploadData.append('imagen', this.imgFile, this.imgFile.name);
        uploadData.append('visible', this.form.value.visible);
        uploadData.append('fechainicio', this.form.value.fechainicio);
        uploadData.append('fechafin', this.form.value.fechafin);
        uploadData.append('idtipooferta', this.form.value.idtipooferta);
        
        this.ofertaService.updateOferta(this.data.idoferta,uploadData).subscribe(
          res => {
            console.log(res);
            this.closeDialog();
            this.toastr.success("Se ha actualizado la oferta satisfactoriamente")
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
        uploadData.append('descuento', this.form.value.descuento);
        uploadData.append('visible', this.form.value.visible);
        uploadData.append('fechainicio', this.form.value.fechainicio);
        uploadData.append('fechafin', this.form.value.fechafin);
        uploadData.append('idtipooferta', this.form.value.idtipooferta);
        
        this.ofertaService.updateOferta(this.data.idoferta, uploadData).subscribe(
          res => {
            console.log(res);
            this.closeDialog();
            this.toastr.success("Se ha actualizado la oferta satisfactoriamente")
          },
          err =>{
            console.error(err)
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
