import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuponService } from 'src/app/services/cupon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-cupon',
  templateUrl: './crear-cupon.component.html',
  styleUrls: ['./crear-cupon.component.css']
})
export class CrearCuponComponent implements OnInit {

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

  get estado(){
    return this.form.get('estado')
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
    cantidad:[0,[Validators.required,Validators.pattern("^[0-9]*$"),]],
    nombre:['',[Validators.required,]],
    descripcion:['',[Validators.required,]],
    descuento:[0,[Validators.required,Validators.pattern("^[0-9]*[.]?[0-9]*$"),]],
    imagen:['',[Validators.required,]],
    visible:[1],
    estado:[1],
    limitediario:[1,],
    preciominimo:[0,[Validators.required,Validators.pattern("^[0-9]*[.]?[0-9]*$"),]],
    fechainicio:[null,[Validators.required,]],
    fechafin:[null,[Validators.required,]],
    idtipocupon:[1],

  })

  constructor(private cuponService:CuponService,
    public dialogRef:MatDialogRef<CrearCuponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  onImageChanged(event: any){
    this.form.value.imagen = event.target.files[0];
    this.imgFile = <File>event.target.files[0];
  }

  guardarCupon(){
    console.log(this.form.value)
    if(this.form.valid){
      const uploadData:any = new FormData();
      uploadData.append('cantidad', this.form.value.cantidad);
      uploadData.append('nombre', this.form.value.nombre);
      uploadData.append('descripcion', this.form.value.descripcion);
      uploadData.append('descuento', this.form.value.descuento);
      uploadData.append('imagen', this.imgFile, this.imgFile.name);
      uploadData.append('visible', this.form.value.visible);
      uploadData.append('idtipocupon', this.form.value.idtipocupon);
      uploadData.append('estado',this.form.value.estado);
      uploadData.append('limitediario', this.form.value.limitediario);
      uploadData.append('preciominimo', this.form.value.preciominimo);
      uploadData.append('fechainicio',this.form.value.fechainicio);
      uploadData.append('fechafin',this.form.value.fechafin);

    console.log(uploadData);

    this.cuponService.saveCupon(uploadData).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.toastr.success("Se ha agregado el cupon satisfactoriamente")
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
