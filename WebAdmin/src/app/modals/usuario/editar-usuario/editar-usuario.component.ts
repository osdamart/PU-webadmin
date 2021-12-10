import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UsuarioService} from '../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  validator:boolean=null;
  admin:boolean=this.data.isAdmin;


  get idrolusuario(){
    return this.form.get('idrolusuario')
  }

  get ide_card(){
    return this.form.get('ide_card')
  }

  get cell_phone(){
    return this.form.get('cell_phone')
  }

  get name(){
    return this.form.get('name')
  }

  get lastname(){
    return this.form.get('lastname')
  }

  get email(){
    return this.form.get('email')
  }

  get fechanac(){
    return this.form.get('fechanac')
  }

  get status(){
    return this.form.get('status')
  }

  form: FormGroup = this.fb.group({

    idrolusuario: [this.data.idrolusuario,[Validators.required,]],
    ide_card: [this.data.ide_card],
    cell_phone: [this.data.cell_phone,[Validators.pattern("^[0-9-+]{9,10}$")]],
    name: [this.data.name,[Validators.required,]],
    lastname: [this.data.lastname,[Validators.required]],
    email: [this.data.email,[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$")]],
    fechanac: [this.data.fechanac],
    status: [this.data.status],
    password: [this.data.password],
  })

  constructor(private usuarioService:UsuarioService,
    public dialogRef:MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  actualizarUsuario(){
    console.log(this.form.value)
    console.log(this.data)
    if(this.form.valid){
      this.usuarioService.updateUsuario(this.data.id,this.form.value).subscribe(
        res => {      
          console.log(res);
          this.closeDialog();  
          this.toastr.success("El usuario "+this.form.value.name+" ha sido actualizado con exito");
        },
        err => console.error(err)
      )
    }else{
      console.log("no se envio el usuario porque hay campos invalidos");
      this.toastr.warning("Asegurese de enviar todos los campos requeridos");
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  refresh(): void {
    window.location.reload();
  }
  
  idCardValidator() {
    let validCI = false;
    console.log("entró al t")
    let ci=this.form.controls['ide_card'].value
    console.log(ci.length)
    if (ci.length == 10)
    {   
        console.log("igual a 10")
        let third = parseInt(ci.substring(2, 3));
        if (third < 6) {
          console.log("menor a 6")
        
            // El ultimo digito se lo considera dígito verificador
            let multi = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
            let verificator = parseInt(ci.substring(9, 10));
            let sum:number = 0;
            let digit:number = 0;
            for (let i = 0; i < (ci.length - 1); i++) {
                digit = parseInt(ci.substring(i, i + 1)) * multi[i];      
                sum += ((parseInt((digit % 10)+'') + (parseInt((digit / 10)+''))));
            }
            
            sum= Math.round(sum);
        
  
            if ((Math.round(sum % 10) == 0) && (Math.round(sum % 10)== verificator)) {
                validCI = true;
            } else if ((10 - (Math.round(sum % 10))) == verificator) {
                validCI = true;
            } else {
                validCI = false;
            }
        } else {
            validCI = false;
        }
    } else {
        validCI = false;
    }
  
  
  this.validator= validCI;
  
    
  }

}