import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfertaService } from 'src/app/services/oferta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.css']
})
export class CrearOfertaComponent implements OnInit {

  imgFile: File = null;

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

  get estado(){
    return this.form.get('estado')
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
    nombre:['',[Validators.required,]],
    descripcion:['',[Validators.required,]],
    descuento:[0,[Validators.required,Validators.pattern("^[0-9]*[.]?[0-9]*$"),]],
    imagen:['',[Validators.required,]],
    visible:[1],
    estado:[1],
    fechainicio:[null,[Validators.required,]],
    fechafin:[null,[Validators.required,]],
    idtipooferta:[1],

  })

  constructor(private ofertaService:OfertaService,
    public dialogRef:MatDialogRef<CrearOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  onImageChanged(event: any){
    this.form.value.imagen = event.target.files[0];
    this.imgFile = <File>event.target.files[0];
  }

  guardarOferta(){
    console.log(this.form.value)
    if(this.form.valid){
      const uploadData:any = new FormData();
      uploadData.append('nombre', this.form.value.nombre);
      uploadData.append('descripcion', this.form.value.descripcion);
      uploadData.append('descuento', this.form.value.descuento);
      uploadData.append('imagen', this.imgFile, this.imgFile.name);
      uploadData.append('visible', this.form.value.visible);
      uploadData.append('idtipooferta', this.form.value.idtipooferta);
      uploadData.append('estado',this.form.value.estado);
      uploadData.append('fechainicio',this.form.value.fechainicio);
      uploadData.append('fechafin',this.form.value.fechafin);

    console.log(uploadData);

    this.ofertaService.saveOferta(uploadData).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.toastr.success("Se ha agregado la oferta satisfactoriamente")
      },
      err=> {
        console.error(err);
      this.toastr.error("Ha ocurrido un error, intente de nuevo más tarde");
      } 
    )
    }else{
      this.toastr.warning("Asegurese de enviar los campos requeridos tal como se solicita"); 
    }

    
    
  }

  closeDialog(){
    this.dialogRef.close();
  }



}
